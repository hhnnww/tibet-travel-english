import { s as __toESM } from "./_runtime.mjs";
import { M as require_jsx_runtime, N as require_react } from "./_libs/@base-ui/react+[...].mjs";
import { o as Outlet } from "./_libs/@tanstack/react-router+[...].mjs";
import { r as NeonAuthUIProvider } from "./_libs/@neondatabase/auth-ui+[...].mjs";
import { n as BetterAuthReactAdapter, t as createAuthClient } from "./_libs/@neondatabase/auth+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authLayout-BszNm4f3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var authClient = createAuthClient("https://ep-jolly-pond-ampkkkgi.neonauth.c-5.us-east-1.aws.neon.tech/neondb/auth", { adapter: BetterAuthReactAdapter() });
var setMode = () => {
	throw new Error("createClientOnlyFn() functions can only be called on the client!");
};
function RouteComponent() {
	(0, import_react.useEffect)(() => {
		setMode("light");
		document.documentElement.classList.add("light");
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeonAuthUIProvider, {
		authClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
//#endregion
export { RouteComponent as component };
