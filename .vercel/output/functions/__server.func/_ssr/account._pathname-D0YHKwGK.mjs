import { M as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AccountView } from "../_libs/@neondatabase/auth-ui+[...].mjs";
import { t as Button$1 } from "./button--uYc8l8a.mjs";
import { t as Route } from "./account._pathname-CmCZ-Bx_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account._pathname-D0YHKwGK.js
var import_jsx_runtime = require_jsx_runtime();
function Account() {
	const { pathname } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen w-full flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-8 items-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountView, { pathname }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin",
				children: "Back"
			}) })]
		})
	});
}
//#endregion
export { Account as component };
