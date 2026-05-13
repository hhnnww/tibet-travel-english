import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react"; // 1. 引入 useState
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
	const qc = useQueryClient();
	const saler = useQuery(orpc.adSalerRoute.list.queryOptions());
	const disSaler = useMutation(
		orpc.adSalerRoute.update.mutationOptions({
			onSuccess: () => {
				qc.invalidateQueries(orpc.adSalerRoute.list.queryOptions());
			},
		}),
	);

	// 2. 添加状态来记录当前正在加载的 ID
	const [loadingId, setLoadingId] = useState<number | string | null>(null);

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
								// disabled={disSaler.isPending} // 可选：禁用其他按钮防止重复点击
								onClick={async () => {
									// 3. 点击时设置当前 loading 的 ID
									setLoadingId(item.id);
									try {
										// 注意：直接修改 item.state 是不推荐的做法，最好通过后端返回或乐观更新
										const newState = !item.state;
										await disSaler.mutateAsync({ ...item, state: newState });
									} finally {
										// 4. 请求结束后清除 loading 状态
										setLoadingId(null);
									}
								}}
							>
								{/* 5. 只有当当前行的 ID 等于 loadingId 时才显示 Spinner */}
								{loadingId === item.id && <Spinner />}
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
