import { s as __toESM } from "../_runtime.mjs";
import { M as require_jsx_runtime, N as require_react, i as ProgressRoot, n as ProgressIndicator$1, r as ProgressTrack$1 } from "../_libs/@base-ui/react+[...].mjs";
import { u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as orpc } from "./client-CDW-NXrF.mjs";
import { t as cn } from "./utils-CvQUiITU.mjs";
import { t as Button$1 } from "./button--uYc8l8a.mjs";
import { t as Input$1 } from "./input-BR8i1os7.mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { _ as ChevronLeft, f as ImagePlus, g as ChevronRight, h as Copy, i as Trash, v as Check } from "../_libs/lucide-react.mjs";
import { t as Spinner } from "./spinner-CDwSnah_.mjs";
import { t as Route } from "./images._page-DOvre9Oh.mjs";
import { t as imageCompression } from "../_libs/browser-image-compression.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/images._page-BIbgZk5d.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ImageList = ({ page }) => {
	const [copiedUrl, setCopiedUrl] = (0, import_react.useState)("");
	const qc = useQueryClient();
	const images = useQuery(orpc.imagesRouter.list.queryOptions({ input: { page } }));
	const deleteMutation = useMutation(orpc.imagesRouter.delete.mutationOptions({ onSuccess: async () => {
		await qc.invalidateQueries(orpc.imagesRouter.list.queryOptions({ input: { page } }));
	} }));
	const handleCopy = async (url) => {
		await navigator.clipboard.writeText(url);
		setCopiedUrl(url);
		setTimeout(() => {
			setCopiedUrl("");
		}, 1500);
	};
	if (images.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "size-6" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4",
		children: images.data?.items?.map((item) => {
			const isDeleting = deleteMutation.isPending && deleteMutation.variables?.key === item.key;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group overflow-hidden rounded-xl gap-2 flex flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-square overflow-hidden bg-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-full w-full items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.url,
							alt: item.key,
							className: "h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-[1.03]",
							loading: "lazy"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							size: "icon",
							variant: "secondary",
							className: "size-8",
							disabled: isDeleting,
							onClick: async () => {
								await deleteMutation.mutateAsync({ key: item.key });
							},
							children: isDeleting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash, { className: "size-4" })
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						value: item.url,
						readOnly: true,
						className: "h-9",
						onClick: (event) => {
							event.currentTarget.select();
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						type: "button",
						size: "icon",
						variant: "outline",
						className: "shrink-0",
						onClick: () => {
							handleCopy(item.url);
						},
						children: copiedUrl === item.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
					})]
				})]
			}, item.key);
		})
	});
};
var PageNavi = ({ page }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-center gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				variant: "outline",
				disabled: page <= 1,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/images/$page",
					params: { page: String(page - 1) },
					children: "上一页"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-sm text-muted-foreground",
				children: [
					"第 ",
					page,
					" 页"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				variant: "outline",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/images/$page",
					params: { page: String(page + 1) },
					children: "下一页"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
			})
		]
	});
};
function Progress$1({ className, children, value, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ProgressRoot, {
		value,
		"data-slot": "progress",
		className: cn("flex flex-wrap gap-3", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressTrack, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressIndicator, {}) })]
	});
}
function ProgressTrack({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressTrack$1, {
		className: cn("relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted", className),
		"data-slot": "progress-track",
		...props
	});
}
function ProgressIndicator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressIndicator$1, {
		"data-slot": "progress-indicator",
		className: cn("h-full bg-primary transition-all", className),
		...props
	});
}
async function compressImage(file) {
	return await imageCompression(file, {
		maxWidthOrHeight: 1200,
		maxSizeMB: 1,
		useWebWorker: true,
		fileType: "image/webp",
		initialQuality: .8
	});
}
function ImageUpload() {
	const qc = useQueryClient();
	const inputRef = (0, import_react.useRef)(null);
	const [uploadedCount, setUploadedCount] = (0, import_react.useState)(0);
	const [totalCount, setTotalCount] = (0, import_react.useState)(0);
	const progress = totalCount > 0 ? uploadedCount / totalCount * 100 : 0;
	const uploadMutation = useMutation({ mutationFn: async (file) => {
		const compressedFile = await compressImage(file);
		const filename = `${crypto.randomUUID()}.webp`;
		const { uploadUrl, fileUrl } = await orpc.imagesRouter.get_upload_url.call({
			filename,
			contentType: "image/webp"
		});
		const res = await fetch(uploadUrl, {
			method: "PUT",
			headers: { "Content-Type": "image/webp" },
			body: compressedFile
		});
		if (!res.ok) throw new Error(await res.text());
		return fileUrl;
	} });
	const batchUploadMutation = useMutation({
		mutationFn: async (files) => {
			setUploadedCount(0);
			setTotalCount(files.length);
			return await Promise.all(files.map(async (file) => {
				const result = await uploadMutation.mutateAsync(file);
				setUploadedCount((prev) => prev + 1);
				return result;
			}));
		},
		onSuccess: async () => {
			await qc.invalidateQueries(orpc.imagesRouter.list.queryOptions({ input: { page: 1 } }));
		},
		onSettled: () => {
			setTimeout(() => {
				setUploadedCount(0);
				setTotalCount(0);
			}, 600);
		}
	});
	const openFilePicker = () => {
		inputRef.current?.click();
	};
	const handleUpload = (0, import_react.useCallback)(async (event) => {
		const files = Array.from(event.target.files || []);
		if (!files.length) return;
		await batchUploadMutation.mutateAsync(files);
		event.target.value = "";
	}, [batchUploadMutation]);
	(0, import_react.useEffect)(() => {
		const handlePaste = async (event) => {
			const items = event.clipboardData?.items;
			if (!items) return;
			const files = [];
			for (const item of items) if (item.type.startsWith("image/")) {
				const file = item.getAsFile();
				if (file) files.push(file);
			}
			if (!files.length) return;
			event.preventDefault();
			await batchUploadMutation.mutateAsync(files);
		};
		window.addEventListener("paste", handlePaste);
		return () => {
			window.removeEventListener("paste", handlePaste);
		};
	}, [batchUploadMutation]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-full flex-col gap-3 items-start",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				accept: "image/*",
				multiple: true,
				className: "hidden",
				onChange: handleUpload
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				type: "button",
				onClick: openFilePicker,
				disabled: batchUploadMutation.isPending,
				className: "gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" }), batchUploadMutation.isPending ? "上传中..." : "上传图片"]
			}),
			batchUploadMutation.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress$1, { value: progress }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-muted-foreground text-xs",
					children: [
						uploadedCount,
						" / ",
						totalCount
					]
				})]
			})
		]
	});
}
function RouteComponent() {
	const params = Route.useParams();
	const page = Number(params.page);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUpload, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageList, { page }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageNavi, { page })
		]
	});
}
//#endregion
export { RouteComponent as component };
