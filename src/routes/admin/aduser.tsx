import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table";
import { Textarea } from "#/components/ui/textarea";
import { orpc } from "#/orpc/client";

export const Route = createFileRoute("/admin/aduser")({
	component: RouteComponent,
	loader: async ({ context }) => {
		await context.queryClient.prefetchQuery(
			orpc.listAdUsers.queryOptions({
				input: {},
				staleTime: 1000 * 60, // 1 minute
			}),
		);
	},
});

function RouteComponent() {
	const qc = useQueryClient();
	const res = useQuery(orpc.listAdUsers.queryOptions({ input: {} }));
	const addUser = useMutation(
		orpc.addAdUser.mutationOptions({
			onSuccess: () => {
				qc.invalidateQueries(orpc.listAdUsers.queryOptions({ input: {} }));
			},
		}),
	);
	const [userText, setUserText] = useState("");
	const delUser = useMutation(
		orpc.deleteAdUser.mutationOptions({
			onSuccess: () => {
				qc.invalidateQueries(orpc.listAdUsers.queryOptions({ input: {} }));
			},
		}),
	);
	return (
		<>
			<div className="flex gap-4 flex-col items-start">
				<Textarea
					value={userText}
					onChange={(e) => setUserText(e.target.value)}
					placeholder="昵称，地址，星级，用英文逗号隔开，一行一个"
				/>
				<Button
					onClick={async () => {
						const arr = userText.split("\n");
						for (const item of arr) {
							const [name, address, star] = item.split(",");
							console.log(name, address, star);
							addUser.mutate({
								nikename: name,
								address: address,
								star: Number(star),
							});
						}
					}}
				>
					新增
				</Button>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>昵称</TableHead>
						<TableHead>地址</TableHead>
						<TableHead>星级</TableHead>
						<TableHead>操作</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{res.data?.map((user) => (
						<TableRow key={user.id}>
							<TableCell>{user.nikename}</TableCell>
							<TableCell>{user.address}</TableCell>
							<TableCell>{user.star}</TableCell>
							<TableCell>
								<Button
									onClick={async () => {
										await delUser.mutateAsync({ id: user.id });
									}}
								>
									删除
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}
