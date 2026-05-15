import { c as createFileRoute, s as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as orpc } from "./client-CDW-NXrF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/adpage-edit._id-C9YiQsJX.js
var $$splitComponentImporter = () => import("./adpage-edit._id-D48S6Dsz.mjs");
var Route = createFileRoute("/_authLayout/admin/adpage-edit/$id")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async ({ context, params }) => {
		await context.queryClient.prefetchQuery(orpc.adpageRoute.get.queryOptions({ input: { id: Number(params.id) } }));
		await context.queryClient.prefetchQuery(orpc.AdReplyRoute.list.queryOptions({ input: { pageId: Number(params.id) } }));
	}
});
//#endregion
export { Route as t };
