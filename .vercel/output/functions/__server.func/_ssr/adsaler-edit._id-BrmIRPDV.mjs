import { c as createFileRoute, s as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as orpc } from "./client-CDW-NXrF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/adsaler-edit._id-BrmIRPDV.js
var $$splitComponentImporter = () => import("./adsaler-edit._id-DrGI2fFD.mjs");
var Route = createFileRoute("/_authLayout/admin/adsaler-edit/$id")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async (ctx) => {
		await ctx.context.queryClient.prefetchQuery(orpc.adSalerRoute.get.queryOptions({ input: { id: Number(ctx.params.id) } }));
	}
});
//#endregion
export { Route as t };
