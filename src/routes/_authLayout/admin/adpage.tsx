import { createFileRoute } from "@tanstack/react-router";
import { orpc } from "#/orpc/client";
import { AdPageTable } from "./-adpage/adpage-table";

export const Route = createFileRoute("/_authLayout/admin/adpage")({
	component: RouteComponent,
	loader: async ({ context }) => {
		context.queryClient.prefetchQuery(
			orpc.adpageRoute.list.queryOptions({ input: {} }),
		);
	},
});

function RouteComponent() {
	return <AdPageTable />;
}
