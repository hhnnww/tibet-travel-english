import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Spinner } from "#/components/ui/spinner";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table";
import { orpc } from "#/orpc/client";

const AdsalerTable = () => {
	const saler = useQuery(orpc.adSalerRoute.list.queryOptions());
	const disSaler = useMutation(orpc.adSalerRoute.update.mutationOptions());
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>ID</TableHead>
					<TableHead>昵称</TableHead>
					<TableHead>状态</TableHead>
					<TableHead>编辑</TableHead>
					<TableHead>操作</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{saler.data?.map((item) => (
					<TableRow key={item.id}>
						<TableCell>{item.id}</TableCell>
						<TableCell className="w-full">{item.name}</TableCell>
						<TableCell>
							{item.state ? (
								<div className="bg-primary py-2 px-3 rounded-full text-white">
									已启用
								</div>
							) : (
								<div className="bg-accent py-2 px-3 rounded-full">已禁用</div>
							)}
						</TableCell>
						<TableCell>
							<Button>
								<Link
									to="/admin/adsaler-edit/$id"
									params={{ id: String(item.id) }}
								>
									编辑
								</Link>
							</Button>
						</TableCell>
						<TableCell>
							<Button
								onClick={async () => {
									item.state = !item.state;
									await disSaler.mutateAsync(item);
								}}
							>
								{disSaler.isPending && <Spinner />}
								{item.state ? "禁用" : "启用"}
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export const AdSalerTableCard = () => {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>销售列表</CardTitle>
			</CardHeader>
			<CardContent>
				<AdsalerTable />
			</CardContent>
		</Card>
	);
};
