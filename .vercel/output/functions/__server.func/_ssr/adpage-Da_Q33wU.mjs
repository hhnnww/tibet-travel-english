import { s as __toESM } from "../_runtime.mjs";
import { M as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as orpc } from "./client-CDW-NXrF.mjs";
import { t as Button$1 } from "./button--uYc8l8a.mjs";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, t as Card } from "./card-Bj9R-P7a.mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { m as Eye, p as FilePlusCorner, s as PencilRuler } from "../_libs/lucide-react.mjs";
import { t as Spinner } from "./spinner-CDwSnah_.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BNeiHdBd.mjs";
import { t as require_dayjs_min } from "../_libs/dayjs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/adpage-Da_Q33wU.js
var import_jsx_runtime = require_jsx_runtime();
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min());
var NewAdpageButton = () => {
	const qc = useQueryClient();
	const newMutation = useMutation(orpc.adpageRoute.new.mutationOptions({ onSuccess: async () => await qc.invalidateQueries(orpc.adpageRoute.list.queryOptions({ input: {} })) }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
		onClick: async () => {
			return await newMutation.mutateAsync({});
		},
		children: [newMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { "data-icon": "inline-start" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlusCorner, {}), "新建广告页面"]
	});
};
var AdPageTable = () => {
	const adpagelist = useQuery(orpc.adpageRoute.list.queryOptions({ input: {} }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "广告页面列表" }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "ID" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "标题" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "创建时间" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "操作" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "预览" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: adpagelist.data?.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: item.id }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "w-full",
					children: item.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: (0, import_dayjs_min.default)(item.createdAt).format("YYYY-MM-DD") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/adpage-edit/$id",
						params: { id: String(item.id) },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PencilRuler, {}), "编辑"] })
					})
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/adpage/$pageid",
					params: { pageid: String(item.id) },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {}), "预览"] })
				}) })
			] }, item.id)) })] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewAdpageButton, {}) })
		]
	});
};
function RouteComponent() {
	if (useQuery(orpc.adpageRoute.list.queryOptions({ input: {} })).isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}), "Loading..."] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdPageTable, {});
}
//#endregion
export { RouteComponent as component };
