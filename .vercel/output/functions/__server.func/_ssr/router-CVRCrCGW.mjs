import { M as require_jsx_runtime, t as TooltipProvider$1 } from "../_libs/@base-ui/react+[...].mjs";
import { a as createRouter, c as createFileRoute, l as createRootRouteWithContext, n as Scripts, r as HeadContent, s as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SmartCoercionPlugin } from "../_libs/@orpc/json-schema+[...].mjs";
import { E as onError } from "../_libs/@orpc/client+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as router_default, t as orpc } from "./client-CDW-NXrF.mjs";
import { t as Route$8 } from "../_pageid-DEFHHaTZ.mjs";
import { t as Route$9 } from "./account._pathname-CmCZ-Bx_.mjs";
import { t as Route$10 } from "./adpage-edit._id-C9YiQsJX.mjs";
import { t as Route$11 } from "./adsaler-edit._id-BrmIRPDV.mjs";
import { t as Route$12 } from "./auth._pathname-DMrs9B0-.mjs";
import { t as Route$13 } from "./images._page-DOvre9Oh.mjs";
import { t as setupRouterSsrQueryIntegration } from "../_libs/@tanstack/react-router-ssr-query+[...].mjs";
import { n as OpenAPIHandler, r as RPCHandler, t as OpenAPIReferencePlugin } from "../_libs/@orpc/openapi+[...].mjs";
import { t as ZodToJsonSchemaConverter } from "../_libs/orpc__zod.mjs";
import { File } from "node:buffer";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CVRCrCGW.js
var import_jsx_runtime = require_jsx_runtime();
function getContext() {
	return { queryClient: new QueryClient({ defaultOptions: { queries: {
		staleTime: Infinity,
		refetchOnMount: false,
		refetchOnWindowFocus: false
	} } }) };
}
function TooltipProvider({ delay = 0, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider$1, {
		"data-slot": "tooltip-provider",
		delay,
		...props
	});
}
var styles_default = "/assets/styles-C_wGHRVs.css";
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "TanStack Start Starter" }
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootDocument,
	notFoundComponent: () => {}
});
function RootDocument({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, { children }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
var $$splitComponentImporter$4 = () => import("../_authLayout-BszNm4f3.mjs");
var Route$6 = createFileRoute("/_authLayout")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./routes-CM9tbeS8.mjs");
var Route$5 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
/**
* This file aims to polyfill missing APIs in Node.js 18 that oRPC depends on.
*
* Since Stackblitz runs on Node.js 18, these polyfills ensure oRPC works in that environment.
* If you're running oRPC locally, please use Node.js 20 or later for full compatibility.
*/
/**
* Note: Stackblitz provides an emulated Node.js environment with inherent limitations.
* If you encounter issues, please test on a local setup with Node.js 20 or later before reporting them.
*/
/**
* The `oz.file()` schema depends on the `File` API.
* If you're not using `oz.file()`, you can safely remove this polyfill.
*/
if (typeof globalThis.File === "undefined") globalThis.File = File;
var handler$1 = new OpenAPIHandler(router_default, {
	interceptors: [onError((error) => {
		console.error(error);
	})],
	plugins: [new SmartCoercionPlugin({ schemaConverters: [new ZodToJsonSchemaConverter()] }), new OpenAPIReferencePlugin({
		schemaConverters: [new ZodToJsonSchemaConverter()],
		specGenerateOptions: {
			info: {
				title: "TanStack ORPC Playground",
				version: "1.0.0"
			},
			commonSchemas: { UndefinedError: { error: "UndefinedError" } },
			security: [{ bearerAuth: [] }],
			components: { securitySchemes: { bearerAuth: {
				type: "http",
				scheme: "bearer"
			} } }
		},
		docsConfig: { authentication: { securitySchemes: { bearerAuth: { token: "default-token" } } } }
	})]
});
async function handle$1({ request }) {
	const { response } = await handler$1.handle(request, {
		prefix: "/api",
		context: {}
	});
	return response ?? new Response("Not Found", { status: 404 });
}
var Route$4 = createFileRoute("/api/$")({ server: { handlers: {
	HEAD: handle$1,
	GET: handle$1,
	POST: handle$1,
	PUT: handle$1,
	PATCH: handle$1,
	DELETE: handle$1
} } });
var $$splitComponentImporter$2 = () => import("./route-D92CRFIC.mjs");
var Route$3 = createFileRoute("/_authLayout/admin")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var handler = new RPCHandler(router_default);
async function handle({ request }) {
	const { response } = await handler.handle(request, {
		prefix: "/api/rpc",
		context: {}
	});
	return response ?? new Response("Not Found", { status: 404 });
}
var Route$2 = createFileRoute("/api/rpc/$")({ server: { handlers: {
	HEAD: handle,
	GET: handle,
	POST: handle,
	PUT: handle,
	PATCH: handle,
	DELETE: handle
} } });
var $$splitComponentImporter$1 = () => import("./adsaler-CZTvpYK2.mjs");
var Route$1 = createFileRoute("/_authLayout/admin/adsaler")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	loader: async (ctx) => {
		await ctx.context.queryClient.prefetchQuery(orpc.adSalerRoute.list.queryOptions());
	}
});
var $$splitComponentImporter = () => import("./adpage-Da_Q33wU.mjs");
var Route = createFileRoute("/_authLayout/admin/adpage")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async ({ context }) => {
		return await context.queryClient.prefetchQuery(orpc.adpageRoute.list.queryOptions({ input: {} }));
	}
});
var AuthLayoutRoute = Route$6.update({
	id: "/_authLayout",
	getParentRoute: () => Route$7
});
var IndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$7
});
var ApiSplatRoute = Route$4.update({
	id: "/api/$",
	path: "/api/$",
	getParentRoute: () => Route$7
});
var AdpagePageidRoute = Route$8.update({
	id: "/adpage/$pageid",
	path: "/adpage/$pageid",
	getParentRoute: () => Route$7
});
var AuthLayoutAdminRouteRoute = Route$3.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthLayoutRoute
});
var ApiRpcSplatRoute = Route$2.update({
	id: "/api/rpc/$",
	path: "/api/rpc/$",
	getParentRoute: () => Route$7
});
var AuthLayoutAuthPathnameRoute = Route$12.update({
	id: "/auth/$pathname",
	path: "/auth/$pathname",
	getParentRoute: () => AuthLayoutRoute
});
var AuthLayoutAdminAdsalerRoute = Route$1.update({
	id: "/adsaler",
	path: "/adsaler",
	getParentRoute: () => AuthLayoutAdminRouteRoute
});
var AuthLayoutAdminAdpageRoute = Route.update({
	id: "/adpage",
	path: "/adpage",
	getParentRoute: () => AuthLayoutAdminRouteRoute
});
var AuthLayoutAccountPathnameRoute = Route$9.update({
	id: "/account/$pathname",
	path: "/account/$pathname",
	getParentRoute: () => AuthLayoutRoute
});
var AuthLayoutAdminImagesPageRoute = Route$13.update({
	id: "/images/$page",
	path: "/images/$page",
	getParentRoute: () => AuthLayoutAdminRouteRoute
});
var AuthLayoutAdminAdsalerEditIdRoute = Route$11.update({
	id: "/adsaler-edit/$id",
	path: "/adsaler-edit/$id",
	getParentRoute: () => AuthLayoutAdminRouteRoute
});
var AuthLayoutAdminRouteRouteChildren = {
	AuthLayoutAdminAdpageRoute,
	AuthLayoutAdminAdsalerRoute,
	AuthLayoutAdminAdpageEditIdRoute: Route$10.update({
		id: "/adpage-edit/$id",
		path: "/adpage-edit/$id",
		getParentRoute: () => AuthLayoutAdminRouteRoute
	}),
	AuthLayoutAdminAdsalerEditIdRoute,
	AuthLayoutAdminImagesPageRoute
};
var AuthLayoutRouteChildren = {
	AuthLayoutAdminRouteRoute: AuthLayoutAdminRouteRoute._addFileChildren(AuthLayoutAdminRouteRouteChildren),
	AuthLayoutAccountPathnameRoute,
	AuthLayoutAuthPathnameRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthLayoutRoute: AuthLayoutRoute._addFileChildren(AuthLayoutRouteChildren),
	AdpagePageidRoute,
	ApiSplatRoute,
	ApiRpcSplatRoute
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
	const context = getContext();
	const router = createRouter({
		routeTree,
		context,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0
	});
	setupRouterSsrQueryIntegration({
		router,
		queryClient: context.queryClient
	});
	return router;
}
//#endregion
export { getRouter };
