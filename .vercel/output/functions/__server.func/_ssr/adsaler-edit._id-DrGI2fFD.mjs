import "../_runtime.mjs";
import { M as require_jsx_runtime, N as require_react, a as SwitchThumb, o as SwitchRoot, p as mergeProps, s as useRender } from "../_libs/@base-ui/react+[...].mjs";
import { u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as cva } from "../_libs/@neondatabase/auth-ui+[...].mjs";
import { t as useForm } from "../_libs/@tanstack/react-form+[...].mjs";
import { t as orpc } from "./client-CDW-NXrF.mjs";
import { t as cn } from "./utils-CvQUiITU.mjs";
import { t as Button$1 } from "./button--uYc8l8a.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-Bj9R-P7a.mjs";
import { a as FieldTitle, i as FieldLabel, n as FieldContent, r as FieldDescription, t as Field } from "./field-CfaGydpd.mjs";
import { t as Input$1 } from "./input-BR8i1os7.mjs";
import { r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { r as Undo2, v as Check } from "../_libs/lucide-react.mjs";
import { t as Spinner } from "./spinner-CDwSnah_.mjs";
import { t as c } from "../_libs/use-debounce.mjs";
import { t as Route } from "./adsaler-edit._id-BrmIRPDV.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var itemVariants = cva("group/item flex w-full flex-wrap items-center rounded-lg border text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-muted", {
	variants: {
		variant: {
			default: "border-transparent",
			outline: "border-border",
			muted: "border-transparent bg-muted/50"
		},
		size: {
			default: "gap-2.5 px-3 py-2.5",
			sm: "gap-2.5 px-3 py-2.5",
			xs: "gap-2 px-2.5 py-2 in-data-[slot=dropdown-menu-content]:p-0"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Item({ className, variant = "default", size = "default", render, ...props }) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps({ className: cn(itemVariants({
			variant,
			size,
			className
		})) }, props),
		render,
		state: {
			slot: "item",
			variant,
			size
		}
	});
}
var itemMediaVariants = cva("flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none", {
	variants: { variant: {
		default: "bg-transparent",
		icon: "[&_svg:not([class*='size-'])]:size-4",
		image: "size-10 overflow-hidden rounded-sm group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover"
	} },
	defaultVariants: { variant: "default" }
});
function ItemMedia({ className, variant = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "item-media",
		"data-variant": variant,
		className: cn(itemMediaVariants({
			variant,
			className
		})),
		...props
	});
}
function ItemContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "item-content",
		className: cn("flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none", className),
		...props
	});
}
function Switch$1({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchRoot, {
		"data-slot": "switch",
		"data-size": size,
		className: cn("peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, {
			"data-slot": "switch-thumb",
			className: "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
		})
	});
}
function RouteComponent() {
	const params = Route.useParams();
	const query = useQuery(orpc.adSalerRoute.get.queryOptions({ input: { id: Number(params.id) } }));
	const mutation = useMutation(orpc.adSalerRoute.update.mutationOptions());
	const form = useForm({
		defaultValues: query.data,
		onSubmit: async (values) => {
			await mutation.mutateAsync(values.value);
		}
	});
	const autoSave = c(async () => {
		await form.handleSubmit();
	}, 800);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-12 gap-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "col-span-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin/adsaler",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, {}), "back"] })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "col-span-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "编辑销售" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-12 gap-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "avatar",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							className: "col-span-12",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "销售头像" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: field.state.value || "",
								onChange: (e) => {
									field.handleChange(e.target.value);
									autoSave();
								},
								className: "w-full"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "name",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							className: "col-span-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "名称" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: field.state.value || "",
								onChange: (e) => {
									field.handleChange(e.target.value);
									autoSave();
								},
								className: "w-full"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "phone",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							className: "col-span-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "手机" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: field.state.value || "",
								onChange: (e) => {
									field.handleChange(e.target.value);
									autoSave();
								},
								className: "w-full"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "wechat",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							className: "col-span-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "微信" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: field.state.value || "",
								onChange: (e) => {
									field.handleChange(e.target.value);
									autoSave();
								},
								className: "w-full"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "email",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							className: "col-span-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "邮箱" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								type: "email",
								value: field.state.value || "",
								onChange: (e) => {
									field.handleChange(e.target.value);
									autoSave();
								},
								className: "w-full"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "whatapp",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							className: "col-span-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "WhatsApp" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: field.state.value || "",
								onChange: (e) => {
									field.handleChange(e.target.value);
									autoSave();
								},
								className: "w-full"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "wechat_erweima",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							className: "col-span-12",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "微信二维码链接" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: field.state.value || "",
								onChange: (e) => {
									field.handleChange(e.target.value);
									autoSave();
								},
								className: "w-full"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "whatapp_erweima",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							className: "col-span-12",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "WhatsApp二维码链接" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: field.state.value || "",
								onChange: (e) => {
									field.handleChange(e.target.value);
									autoSave();
								},
								className: "w-full"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "state",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							orientation: "vertical",
							className: `${field.state.value && "bg-primary text-white"} col-span-12 p-4 border rounded-2xl`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTitle, { children: field.state.value ? "已启用" : "已禁用" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `${field.state.value && "text-white"}`,
								children: "如果选择禁用，前台销售轮换中就不会出现这个销售"
							}) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
								id: "switch-share",
								checked: field.state.value,
								onCheckedChange: (checked) => {
									field.handleChange(checked);
									autoSave();
								}
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-span-12",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
							variant: "outline",
							size: "sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemMedia, { children: mutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { "data-icon": "inline-start" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-5" }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemContent, { children: mutation.isPending ? "保存中..." : "已保存" }),
								" "
							]
						})
					})
				]
			}) }) })] })
		})]
	});
}
//#endregion
export { RouteComponent as component };
