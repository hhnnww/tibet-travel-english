import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Spinner } from "#/components/ui/spinner";
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
	const query = useQuery(orpc.adpageRoute.list.queryOptions({ input: {} }));
	if (query.isLoading)
		return (
			<div>
				<Spinner />
				Loading...
			</div>
		);

	return <AdPageTable />;
}
