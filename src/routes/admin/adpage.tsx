import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import { Button } from "#/components/ui/button";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table";
import { orpc } from "#/orpc/client";

export const Route = createFileRoute("/admin/adpage")({
	component: RouteComponent,
	loader: async ({ context }) => {
		await context.queryClient.prefetchQuery(
			orpc.listAdPages.queryOptions({ input: {} }),
		);

		await context.queryClient.prefetchQuery(
			orpc.listAdUsers.queryOptions({
				input: {},
			}),
		);
	},
});

function RouteComponent() {
	const qc = useQueryClient();

	const pages = useQuery(orpc.listAdPages.queryOptions({ input: {} }));
	const adUsers = useQuery(orpc.listAdUsers.queryOptions({ input: {} }));
	const addPage = useMutation(
		orpc.addAdPage.mutationOptions({
			onSuccess: () =>
				qc.invalidateQueries(orpc.listAdPages.queryOptions({ input: {} })),
		}),
	);

	return (
		<div className="flex flex-col gap-4">
			<div className="">
				<Button
					onClick={() => {
						addPage.mutate({ title: "new ad page" });
					}}
				>
					新建页面
				</Button>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>标题</TableHead>
						<TableHead>创建时间</TableHead>
						<TableHead>所属用户</TableHead>
						<TableHead>操作</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{pages.data?.map((page) => (
						<TableRow key={page.id}>
							<TableHead>{page.title}</TableHead>
							<TableHead>
								{page.createdAt
									? dayjs(page.createdAt).format("YYYY-MM-DD HH:mm:ss")
									: null}
							</TableHead>
							<TableHead>
								{adUsers.data?.find((user) => user.id === page.userId)
									?.nikename || "未分配"}
							</TableHead>
							<TableHead>
								<Button>
									<Link
										to="/admin/adpage-edit/$id"
										params={{ id: page.id.toString() }}
									>
										编辑
									</Link>
								</Button>
							</TableHead>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
