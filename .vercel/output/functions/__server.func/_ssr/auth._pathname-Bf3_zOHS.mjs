import { M as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { n as AuthView } from "../_libs/@neondatabase/auth-ui+[...].mjs";
import { t as Route } from "./auth._pathname-DMrs9B0-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth._pathname-Bf3_zOHS.js
var import_jsx_runtime = require_jsx_runtime();
function Auth() {
	const { pathname } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			minHeight: "100vh"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthView, { pathname })
	});
}
//#endregion
export { Auth as component };
