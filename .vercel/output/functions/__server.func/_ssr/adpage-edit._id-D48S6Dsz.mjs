import { M as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useForm } from "../_libs/@tanstack/react-form+[...].mjs";
import { t as orpc } from "./client-CDW-NXrF.mjs";
import { t as cn } from "./utils-CvQUiITU.mjs";
import { t as Button$1 } from "./button--uYc8l8a.mjs";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-Bj9R-P7a.mjs";
import { i as FieldLabel, o as Separator$1, t as Field } from "./field-CfaGydpd.mjs";
import { t as Input$1 } from "./input-BR8i1os7.mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { f as ImagePlus, o as Plus, r as Undo2 } from "../_libs/lucide-react.mjs";
import { t as Spinner } from "./spinner-CDwSnah_.mjs";
import { t as Route } from "./adpage-edit._id-C9YiQsJX.mjs";
import { t as c } from "../_libs/use-debounce.mjs";
import { t as index_default } from "../_libs/tiptap__extension-image.mjs";
import { n as useEditor, t as EditorContent } from "../_libs/fast-equals+tiptap__react.mjs";
import { t as index_default$1 } from "../_libs/tiptap__starter-kit.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/adpage-edit._id-D48S6Dsz.js
var import_jsx_runtime = require_jsx_runtime();
function TiptapField({ value, onChange }) {
	const editor = useEditor({
		extensions: [index_default$1, index_default.configure({
			inline: false,
			allowBase64: true
		})],
		content: value,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		}
	});
	const addImage = () => {
		const url = window.prompt("输入图片 URL");
		if (url) editor?.chain().focus().setImage({ src: url }).run();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("w-full border p-4 rounded-xl gap-4 flex flex-col items-start"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
			type: "button",
			onClick: addImage,
			size: "sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" }), "插入图片"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorContent, {
			editor,
			className: cn("[&_.ProseMirror]:min-h-40", "[&_.ProseMirror]:outline-none", "[&_.ProseMirror]:break-word", "[&_.ProseMirror]:whitespace-pre-wrap", "[&_.ProseMirror_img]:rounded-md", "[&_.ProseMirror_img]:max-w-full", "[&_.ProseMirror_img]:rounded-md", "[&_.ProseMirror_img]:max-w-50", "[&_.ProseMirror_img]:max-h-50", "[&_.ProseMirror_img]:object-contain")
		})]
	});
}
var AdPageEditForm = ({ id }) => {
	const adpage = useQuery(orpc.adpageRoute.get.queryOptions({ input: { id } }));
	const updateAdpage = useMutation(orpc.adpageRoute.update.mutationOptions());
	const form = useForm({
		defaultValues: adpage.data,
		onSubmit: async ({ value }) => {
			await updateAdpage.mutateAsync(value);
		}
	});
	const autoSave = c(async () => {
		await form.handleSubmit();
	}, 800);
	if (adpage.isFetching) return "loading...";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "编辑广告页面提问" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "自动保存，直接编辑即可" })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6 items-start p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-row gap-6 w-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
									name: "nikename",
									children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
										className: "w-full",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "昵称" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											value: field.state.value || "",
											onChange: (e) => {
												field.handleChange(e.target.value);
												autoSave();
											},
											className: "w-full"
										})]
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
									name: "address",
									children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "地址" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
										value: field.state.value || "",
										onChange: (e) => {
											field.handleChange(e.target.value);
											autoSave();
										},
										className: "w-full"
									})] })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
									name: "avatar",
									children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "头像" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
										value: field.state.value || "",
										onChange: (e) => {
											field.handleChange(e.target.value);
											autoSave();
										},
										className: "w-full"
									})] })
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: "star",
							children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "星级" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: field.state.value?.toString(),
								onChange: (e) => {
									field.handleChange(Number(e.target.value));
									autoSave();
								}
							})] })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "title",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "标题" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							value: field.state.value,
							onChange: (e) => {
								field.handleChange(e.target.value);
								autoSave();
							}
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "content",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "内容" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiptapField, {
							value: field.state.value,
							onChange: (value) => {
								field.handleChange(value);
								autoSave();
							}
						})] })
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-muted-foreground",
				children: updateAdpage.isPending ? "保存中..." : "已保存"
			}) })
		]
	});
};
var AdreplyAdd = ({ pageid }) => {
	const qc = useQueryClient();
	const addMustation = useMutation(orpc.AdReplyRoute.new.mutationOptions({ onSuccess: async () => {
		await qc.invalidateQueries(orpc.AdReplyRoute.list.queryOptions({ input: { pageId: pageid } }));
	} }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
		onClick: async () => {
			await addMustation.mutateAsync({ pageId: pageid });
		},
		children: [addMustation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { "data-icon": "inline-start" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "新建回复"]
	});
};
var AdReplyEditForm = ({ adreply, index }) => {
	const updateAdreply = useMutation(orpc.AdReplyRoute.update.mutationOptions());
	const form = useForm({
		defaultValues: adreply,
		onSubmit: async ({ value }) => {
			await updateAdreply.mutateAsync(value);
		}
	});
	const autoSave = c(async () => {
		await form.handleSubmit();
	}, 800);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, { children: [
				"# ",
				index + 1,
				" 编辑广告回答"
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "自动保存，直接编辑即可" })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-4 gap-6 w-full p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "nikename",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							className: "w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "昵称" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
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
						name: "address",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "地址" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							value: field.state.value || "",
							onChange: (e) => {
								field.handleChange(e.target.value);
								autoSave();
							},
							className: "w-full"
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: "avatar",
							children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "头像" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: field.state.value || "",
								onChange: (e) => {
									field.handleChange(e.target.value);
									autoSave();
								},
								className: "w-full"
							})] })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "star",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "星级" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							value: field.state.value || "",
							onChange: (e) => {
								field.handleChange(Number(e.target.value));
								autoSave();
							},
							className: "w-full"
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "contributions",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "贡献" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							value: field.state.value || "",
							onChange: (e) => {
								field.handleChange(Number(e.target.value));
								autoSave();
							},
							className: "w-full"
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "publishDate",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "发布时间" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							value: field.state.value || "",
							onChange: (e) => {
								field.handleChange(Number(e.target.value));
								autoSave();
							},
							className: "w-full"
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-span-1",
						children: form.getFieldValue("avatar") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: form.getFieldValue("avatar"),
							alt: "avatar"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-span-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: "content",
							children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "内容" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiptapField, {
								value: field.state.value || "",
								onChange: (value) => {
									field.handleChange(value);
									autoSave();
								}
							})] })
						})
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-muted-foreground",
				children: updateAdreply.isPending ? "保存中..." : "已保存"
			}) })
		]
	});
};
function RouteComponent() {
	const params = Route.useParams();
	const adReplys = useQuery(orpc.AdReplyRoute.list.queryOptions({ input: { pageId: Number(params.id) } }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-start gap-12 w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin/adpage",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, {}), "返回"] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdPageEditForm, { id: Number(params.id) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdreplyAdd, { pageid: Number(params.id) }),
			adReplys.data?.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdReplyEditForm, {
				adreply: item,
				index
			}, item.id))
		]
	});
}
//#endregion
export { RouteComponent as component };
