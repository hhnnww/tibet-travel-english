import { c as createFileRoute, s as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as orpc } from "./client-CDW-NXrF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/images._page-DOvre9Oh.js
var $$splitComponentImporter = () => import("./images._page-BIbgZk5d.mjs");
var Route = createFileRoute("/_authLayout/admin/images/$page")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async (ctx) => {
		await ctx.context.queryClient.prefetchQuery(orpc.imagesRouter.list.queryOptions({ input: { page: Number(ctx.params.page) } }));
	}
});
//#endregion
export { Route as t };
