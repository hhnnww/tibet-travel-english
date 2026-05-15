import { c as createFileRoute, s as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as orpc } from "./_ssr/client-CDW-NXrF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_pageid-DEFHHaTZ.js
var $$splitComponentImporter = () => import("./_pageid-D-suxQs8.mjs");
var Route = createFileRoute("/adpage/$pageid")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async (ctx) => {
		return await Promise.all([ctx.context.queryClient.ensureQueryData(orpc.adpageWithReplyRoute.get.queryOptions({ input: { pageid: Number(ctx.params.pageid) } })), ctx.context.queryClient.ensureQueryData(orpc.adSalerRoute.current_saler.queryOptions())]);
	}
});
//#endregion
export { Route as t };
