import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { useEffect } from "react";

import { setMode } from "#/lib/set-theme-mode";
import { orpc } from "#/orpc/client";
import { AnsWer } from "./-adpage-component/answer";
import { AdpageAsk } from "./-adpage-component/ask";
import { Header } from "./-adpage-component/header";
import { AdPageNav } from "./-adpage-component/nav";
import { Sidebar } from "./-adpage-component/sidebr";

export const Route = createFileRoute("/adpage/$pageid")({
	component: RouteComponent,
	loader: async (ctx) => {
		await ctx.context.queryClient.prefetchQuery(
			orpc.adpageWithReplyRoute.get.queryOptions({
				input: {
					pageid: Number(ctx.params.pageid),
				},
			}),
		);

		await ctx.context.queryClient.prefetchQuery(
			orpc.adSalerRoute.list.queryOptions(),
		);
	},
});

function RouteComponent() {
	useEffect(() => {
		setMode("light");
		document.documentElement.classList.add("light");
	});
	const params = Route.useParams();
	const query = useQuery(
		orpc.adpageWithReplyRoute.get.queryOptions({
			input: {
				pageid: Number(params.pageid),
			},
		}),
	);
	const salers = useQuery(orpc.adSalerRoute.list.queryOptions());
	return (
		<div className="grid grid-cols-12 gap-4 max-w-300 mx-auto py-4 px-2">
			<div className="col-span-12">
				<Header />
			</div>

			<div className="col-span-12">
				<AdPageNav />
			</div>

			<div className="col-span-12">
				<AdpageAsk item={query.data} />
			</div>

			<div className="col-span-8">
				<AnsWer items={query.data?.replies ?? []} />
			</div>

			<div className="col-span-4 sticky top-4 h-fit">
				<Sidebar salers={salers.data ?? []} />
			</div>
		</div>
	);
}
