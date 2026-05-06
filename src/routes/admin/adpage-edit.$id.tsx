import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { Spinner } from "#/components/ui/spinner";
import { orpc } from "#/orpc/client";
import { AdPageEdit } from "./-adPageEdit";
import { AdReplayEdit } from "./-adReplayEdit";

export const Route = createFileRoute("/admin/adpage-edit/$id")({
	component: RouteComponent,
	loader: async ({ params, context }) => {
		await context.queryClient.prefetchQuery(
			orpc.getAdPage.queryOptions({ input: { id: Number(params.id) } }),
		);

		await context.queryClient.prefetchQuery(
			orpc.listAdUsers.queryOptions({
				input: {},
			}),
		);

		await context.queryClient.prefetchQuery(
			orpc.listAdReplys.queryOptions({
				input: {},
			}),
		);
	},
});

function RouteComponent() {
	const qc = useQueryClient();
	const params = Route.useParams();
	const adPage = useQuery(
		orpc.getAdPage.queryOptions({ input: { id: Number(params.id) } }),
	);
	const addReplay = useMutation(
		orpc.addAdReply.mutationOptions({
			onSuccess: async () => {
				await qc.invalidateQueries(
					orpc.listAdReplys.queryOptions({ input: {} }),
				);
			},
		}),
	);
	const adReplays = useQuery(orpc.listAdReplys.queryOptions({ input: {} }));
	return (
		<div className="flex flex-col gap-8 items-start">
			{adPage.data && <AdPageEdit item={adPage.data} />}

			{adPage.data && (
				<Button
					onClick={() => addReplay.mutateAsync({ pageId: adPage.data?.id })}
				>
					{addReplay.isPending && <Spinner data-icon="inline-start" />}
					新建一个回复
				</Button>
			)}
			<div className="flex flex-col gap-12 w-full items-start">
				{adReplays?.data?.map((item) => (
					<AdReplayEdit item={item} key={item.id} />
				))}
			</div>
		</div>
	);
}
