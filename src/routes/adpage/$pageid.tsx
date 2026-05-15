import { createFileRoute } from "@tanstack/react-router";
import { orpc } from "#/orpc/client";
import { AnsWer } from "./-adpage-component/answer";
import { AdpageAsk } from "./-adpage-component/ask";
import { BottomButton } from "./-adpage-component/bottom-button";
import { Header } from "./-adpage-component/header";
import { AdPageNav } from "./-adpage-component/nav";
import { SalerDrawer } from "./-adpage-component/saler-drawer-button";
import { Sidebar } from "./-adpage-component/sidebr";

export const Route = createFileRoute("/adpage/$pageid")({
	component: RouteComponent,
	loader: async (ctx) => {
		return await Promise.all([
			ctx.context.queryClient.ensureQueryData(
				orpc.adpageWithReplyRoute.get.queryOptions({
					input: {
						pageid: Number(ctx.params.pageid),
					},
				}),
			),
			ctx.context.queryClient.ensureQueryData(
				orpc.adSalerRoute.current_saler.queryOptions(),
			),
		]);
	},
});

function RouteComponent() {
	const params = Route.useParams();
	return (
		<>
			<div className="grid grid-cols-12 gap-4 max-w-300 mx-auto p-4 md:p-8 ">
				<div className="col-span-12">
					<Header />
				</div>

				<div className="col-span-12">
					<AdPageNav />
				</div>

				<div className="col-span-12">
					<AdpageAsk num={Number(params.pageid)} />
				</div>

				<div className="col-span-12 xl:col-span-8">
					<AnsWer num={Number(params.pageid)} />
				</div>

				<div className="lg:col-span-4 sticky top-4 h-fit hidden xl:block">
					<Sidebar />
				</div>
			</div>

			<SalerDrawer />
			<BottomButton />
		</>
	);
}
