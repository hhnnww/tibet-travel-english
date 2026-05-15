import { M as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { o as Outlet, u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SignedIn, i as RedirectToSignIn, o as UserButton } from "../_libs/@neondatabase/auth-ui+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-D92CRFIC.js
var import_jsx_runtime = require_jsx_runtime();
function RouteComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-8 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "text-xl uppercase",
						to: "/admin",
						children: "admin"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin/adpage",
								children: "广告页面"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin/adsaler",
								children: "销售"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin/images/$page",
								params: { page: "1" },
								children: "图片空间"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-300 mx-auto p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {})
		]
	});
}
//#endregion
export { RouteComponent as component };
