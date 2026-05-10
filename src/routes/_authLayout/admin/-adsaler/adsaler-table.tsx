import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
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
					<TableRow key={item.id} className="h-14">
						<TableCell>{item.id}</TableCell>
						<TableCell className="w-full">{item.name}</TableCell>
						<TableCell>{item.state ? "1" : "0"}</TableCell>
						<TableCell>编辑</TableCell>
						<TableCell>禁用</TableCell>
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
