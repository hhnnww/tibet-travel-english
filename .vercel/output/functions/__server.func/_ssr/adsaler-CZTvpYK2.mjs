import { s as __toESM } from "../_runtime.mjs";
import { M as require_jsx_runtime, N as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as orpc } from "./client-CDW-NXrF.mjs";
import { t as Button$1 } from "./button--uYc8l8a.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-Bj9R-P7a.mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as UserRoundPlus } from "../_libs/lucide-react.mjs";
import { t as Spinner } from "./spinner-CDwSnah_.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BNeiHdBd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/adsaler-CZTvpYK2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AdSalerAdd = () => {
	const qc = useQueryClient();
	const addsaler = useMutation(orpc.adSalerRoute.new.mutationOptions({ onSuccess: async () => {
		await qc.invalidateQueries(orpc.adSalerRoute.list.queryOptions());
	} }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
		onClick: async () => {
			await addsaler.mutateAsync({});
		},
		children: [addsaler.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRoundPlus, {}), "新建销售"]
	});
};
var AdsalerTable = () => {
	const qc = useQueryClient();
	const saler = useQuery(orpc.adSalerRoute.list.queryOptions());
	const disSaler = useMutation(orpc.adSalerRoute.update.mutationOptions({ onSuccess: () => {
		qc.invalidateQueries(orpc.adSalerRoute.list.queryOptions());
	} }));
	const [loadingId, setLoadingId] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "ID" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "昵称" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "状态" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "编辑" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "操作" })
	] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: saler.data?.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: item.id }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "w-full",
			children: item.name
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: item.state ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-primary py-2 px-3 rounded-full text-white",
			children: "已启用"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-accent py-2 px-3 rounded-full",
			children: "已禁用"
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/admin/adsaler-edit/$id",
			params: { id: String(item.id) },
			children: "编辑"
		}) }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
			onClick: async () => {
				setLoadingId(item.id);
				try {
					const newState = !item.state;
					await disSaler.mutateAsync({
						...item,
						state: newState
					});
				} finally {
					setLoadingId(null);
				}
			},
			children: [loadingId === item.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}), item.state ? "禁用" : "启用"]
		}) })
	] }, item.id)) })] });
};
var AdSalerTableCard = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "销售列表" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdsalerTable, {}) })]
	});
};
function RouteComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8 items-start",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSalerAdd, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSalerTableCard, {})]
	});
}
//#endregion
export { RouteComponent as component };
