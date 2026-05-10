import { createFileRoute } from "@tanstack/react-router";
import { orpc } from "#/orpc/client";
import { AdSalerAdd } from "./-adsaler/adsaler-add";
import { AdSalerTableCard } from "./-adsaler/adsaler-table";

export const Route = createFileRoute("/_authLayout/admin/adsaler")({
	component: RouteComponent,

	loader: async (ctx) => {
		await ctx.context.queryClient.prefetchQuery(
			orpc.adSalerRoute.list.queryOptions(),
		);
	},
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-8 items-start">
			<AdSalerAdd />

			<AdSalerTableCard />
		</div>
	);
}
