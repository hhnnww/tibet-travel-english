import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { setMode } from "#/lib/set-theme-mode";
import { orpc } from "#/orpc/client";
import { AdpageAsk } from "./-adpage-component/ask";
import { Header } from "./-adpage-component/header";
import { AdPageNav } from "./-adpage-component/nav";

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
	return (
		<div className="light min-h-screen" style={{ colorScheme: "light" }}>
			<div className="max-w-300 mx-auto flex flex-col">
				<Header />
				<AdPageNav />
				<AdpageAsk item={query.data} />
			</div>
		</div>
	);
}
