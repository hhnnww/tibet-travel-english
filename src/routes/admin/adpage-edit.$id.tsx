import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Undo2 } from "lucide-react";
import { Button } from "#/components/ui/button";
import { orpc } from "#/orpc/client";
import { AdPageEditForm } from "./-adpage/adpage-edit-form";
import { AdreplyAdd } from "./-adpage/adreply-add";
import { AdReplyEditForm } from "./-adpage/adreply-edit-form";

export const Route = createFileRoute("/admin/adpage-edit/$id")({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		await context.queryClient.prefetchQuery(
			orpc.adpageRoute.get.queryOptions({
				input: {
					id: Number(params.id),
				},
			}),
		);

		await context.queryClient.prefetchQuery(
			orpc.AdReplyRoute.list.queryOptions({
				input: { pageId: Number(params.id) },
			}),
		);
	},
});

function RouteComponent() {
	const params = Route.useParams();
	const adReplys = useQuery(
		orpc.AdReplyRoute.list.queryOptions({
			input: {
				pageId: Number(params.id),
			},
		}),
	);

	return (
		<div className="flex flex-col items-start gap-12 w-full">
			<Link to="/admin/adpage">
				<Button>
					<Undo2 />
					返回
				</Button>
			</Link>
			<AdPageEditForm id={Number(params.id)} />
			<AdreplyAdd pageid={Number(params.id)} />

			{adReplys.data?.map((item, index) => (
				<AdReplyEditForm adreply={item} key={item.id} index={index} />
			))}
		</div>
	);
}
