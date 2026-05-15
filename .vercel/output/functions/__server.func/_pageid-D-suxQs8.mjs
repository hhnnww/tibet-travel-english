import { s as __toESM } from "./_runtime.mjs";
import { M as require_jsx_runtime, N as require_react, c as AvatarImage$1, l as AvatarRoot } from "./_libs/@base-ui/react+[...].mjs";
import { s as Drawer } from "./_libs/@neondatabase/auth-ui+[...].mjs";
import { t as orpc } from "./_ssr/client-CDW-NXrF.mjs";
import { t as cn } from "./_ssr/utils-CvQUiITU.mjs";
import { t as Route } from "./_pageid-DEFHHaTZ.mjs";
import { t as Button$1 } from "./_ssr/button--uYc8l8a.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./_ssr/card-Bj9R-P7a.mjs";
import { i as FieldLabel, t as Field } from "./_ssr/field-CfaGydpd.mjs";
import { t as Input$1 } from "./_ssr/input-BR8i1os7.mjs";
import { n as useSuspenseQuery } from "./_libs/tanstack__react-query.mjs";
import { a as Search, c as MessageCircle, g as ChevronRight, h as Copy, l as Menu, t as X, u as Mail, v as Check } from "./_libs/lucide-react.mjs";
import { t as esm_default } from "./_libs/html-react-parser+[...].mjs";
import { t as src_default } from "./_libs/isomorphic-dompurify.mjs";
import { t as create } from "./_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_pageid-D-suxQs8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Avatar$1({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarRoot, {
		"data-slot": "avatar",
		"data-size": size,
		className: cn("group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten", className),
		...props
	});
}
function AvatarImage({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage$1, {
		"data-slot": "avatar-image",
		className: cn("aspect-square size-full rounded-full object-cover", className),
		...props
	});
}
var AddressIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	viewBox: "0 0 24 24",
	width: "16px",
	height: "16px",
	"aria-hidden": "true",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M8 4.75a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-3 1.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m11 .5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-3 1.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m-5 2.5a6.91 6.91 0 0 1 5.36 2.493 6.96 6.96 0 0 1 8.244 2.312l.146.199v4.996H2.25v-6.997l.147-.199A6.91 6.91 0 0 1 8 10.75m3.75 8.5h8.5v-2.995a5.46 5.46 0 0 0-8.5 0zm-1.5 0h-6.5v-4.994a5.41 5.41 0 0 1 4.245-2.006h.01a5.4 5.4 0 0 1 4.006 1.73 7 7 0 0 0-1.615 1.575l-.146.199z"
	})
});
var DateIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	viewBox: "0 0 24 24",
	width: "16px",
	height: "16px",
	"aria-hidden": "true",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M8.007 2.75a.75.75 0 0 1 .748.752l-.002.748h2.512V3.5a.75.75 0 0 1 1.5 0v.75h2.472l-.002-.748a.75.75 0 1 1 1.5-.004l.002.752h4.018v17H3.245v-17h4.008l.002-.752a.75.75 0 0 1 .752-.748m-.758 3H4.745v14h14.51v-14h-2.513l.006 1.747-1.5.005-.006-1.752h-2.477V7.5h-1.5V5.75H8.749l-.004 1.752-1.5-.004zm-.004 6h5.5v5.5h-5.5zm1.5 1.5v2.5h2.5v-2.5z"
	})
});
var ContributionIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	viewBox: "0 0 24 24",
	width: "16px",
	height: "16px",
	"aria-hidden": "true",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M3.533 3.167h17.2v13.34H15.68l-3.685 3.799-3.392-3.799h-5.07zm1.5 1.5v10.34h4.242l2.766 3.097 3.004-3.097h4.188V4.667z"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M10.978 8.556a.2.2 0 0 1-.148.108l-2.144.33a.2.2 0 0 0-.11.339l1.54 1.526a.2.2 0 0 1 .057.175l-.35 2.14a.2.2 0 0 0 .29.21l1.928-.993a.2.2 0 0 1 .183 0l1.928.994a.2.2 0 0 0 .29-.21l-.35-2.141a.2.2 0 0 1 .056-.175l1.542-1.526a.2.2 0 0 0-.11-.34l-2.145-.33a.2.2 0 0 1-.148-.107L12.31 6.62a.2.2 0 0 0-.357 0zm1.155.966a1.7 1.7 0 0 1-.741.538c.172.259.27.56.283.871a1.7 1.7 0 0 1 .916 0 1.7 1.7 0 0 1 .283-.871 1.7 1.7 0 0 1-.741-.538"
	})]
});
var LikeIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	viewBox: "0 0 24 24",
	width: "20px",
	height: "20px",
	"aria-hidden": "true",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "m14.539 4.661-.004.04-.003.04-.006.072a1 1 0 0 1-.016.116l-1.03 5.017h6.765a.267.267 0 0 1 .264.301l-1.311 8.533v.002a.27.27 0 0 1-.267.227H7.708v-7.9l5.224-5.017 1.027-.963c.066-.054.134-.117.18-.161l.022-.02c.07-.066.132-.122.195-.172a.7.7 0 0 1 .183-.115m.692-1.49c.246.097.41.239.51.334.22.206.31.465.349.618.044.172.058.342.058.478v.038l-.003.038a9 9 0 0 0-.024.28 3 3 0 0 1-.043.293l-.635 3.095h4.802a1.867 1.867 0 0 1 1.849 2.13l-.002.009-1.312 8.538a1.87 1.87 0 0 1-1.862 1.588H6.108V10.427l5.725-5.5 1.081-1.012.03-.023.032-.029c.02-.017.038-.035.063-.058l.03-.028c.073-.068.175-.163.292-.256.218-.172.59-.425 1.068-.458.29-.02.557.01.802.108M2.688 10.013a.8.8 0 0 1 .8.8v10.13h-1.6v-10.13a.8.8 0 0 1 .8-.8"
	})
});
var MenuIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	viewBox: "0 0 24 24",
	width: "20px",
	height: "20px",
	"aria-hidden": "true",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4m14 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4m-7 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4" })
});
function Drawer$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
		"data-slot": "drawer",
		...props
	});
}
function DrawerPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Portal, {
		"data-slot": "drawer-portal",
		...props
	});
}
function DrawerClose({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Close, {
		"data-slot": "drawer-close",
		...props
	});
}
function DrawerOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, {
		"data-slot": "drawer-overlay",
		className: cn("fixed inset-0 z-50 bg-black/10 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", className),
		...props
	});
}
function DrawerContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerPortal, {
		"data-slot": "drawer-portal",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
			"data-slot": "drawer-content",
			className: cn("group/drawer-content fixed z-50 flex h-auto flex-col bg-popover text-sm text-popover-foreground data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-xl data-[vaul-drawer-direction=bottom]:border-t data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:rounded-r-xl data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:rounded-l-xl data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-xl data-[vaul-drawer-direction=top]:border-b data-[vaul-drawer-direction=left]:sm:max-w-sm data-[vaul-drawer-direction=right]:sm:max-w-sm", className),
			...props,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-4 hidden h-1 w-[100px] shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:block" }), children]
		})]
	});
}
function DrawerFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "drawer-footer",
		className: cn("mt-auto flex flex-col gap-2 p-4", className),
		...props
	});
}
var useOpenStore = create((set) => ({
	open: false,
	setOpen: (open) => set({ open })
}));
var Sidebar = () => {
	const current_saler = useSuspenseQuery(orpc.adSalerRoute.current_saler.queryOptions()).data;
	if (!current_saler) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
		className: "",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
			className: "font-semibold ",
			children: ["Contact ", current_saler.name]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [
			"You can get in touch with ",
			current_saler.name,
			" via the following ways to customize your tibet tour."
		] })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center flex flex-col items-center pt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, {
					size: "lg",
					className: "data-[size=lg]:size-24",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
						src: current_saler.avatar || "",
						alt: "avatar"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xl font-semibold",
					children: current_saler.name || ""
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarInputItem, {
					title: "Email",
					value: current_saler.email || "",
					link: `mailto:${current_saler.email}`,
					linkText: `Send email to ${current_saler.name}`,
					buttonIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarInputItem, {
					title: "wechat",
					value: current_saler.wechat || "",
					link: `weixin://dl/chat?uin=${current_saler.wechat}`,
					linkText: "Open wechat",
					buttonIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarInputItem, {
					title: "whatapp",
					value: current_saler.whatapp || "",
					link: `whatsapp://send?phone=${current_saler.whatapp}`,
					linkText: "Open whatsapp",
					buttonIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {})
				})
			})
		]
	}) })] });
};
var SidebarInputItem = (ctx) => {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	const handleSelectAll = () => {
		if (inputRef.current) inputRef.current.select();
	};
	const handleCopy = async () => {
		if (!ctx.value) return;
		try {
			await navigator.clipboard.writeText(ctx.value);
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: ctx.title }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
				ref: inputRef,
				value: ctx.value,
				onClick: handleSelectAll
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				onClick: handleCopy,
				size: "icon",
				variant: "outline",
				children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: ctx.link,
			target: "_blank",
			rel: "noreferrer",
			className: "w-full flex",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				className: "w-full bg-[#00852F]",
				children: [ctx.buttonIcon, ctx.linkText]
			})
		})
	] });
};
var SalerDrawer = () => {
	const { open, setOpen } = useOpenStore();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, {
			onCloseAutoFocus: (e) => {
				e.preventDefault();
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-row justify-center p-4 lg:p-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-svw lg:max-w-200",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerFooter, {
				className: "pt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerClose, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "outline",
					className: "rounded-full h-12 w-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				}) })
			})]
		})
	});
};
var XsButton = () => {
	const { open, setOpen } = useOpenStore();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => {
			setOpen(!open);
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[#00852F] font-bold",
			children: useSuspenseQuery(orpc.adSalerRoute.current_saler.queryOptions())?.data?.name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[#333] text-xs",
			children: " (click to contact)"
		})]
	});
};
var AnsWer = (item) => {
	const query = useSuspenseQuery(orpc.adpageWithReplyRoute.get.queryOptions({ input: { pageid: item.num } }));
	if (!query.data) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-12",
		children: query.data.replies.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnswerBox, { item }, item.id))
	});
};
var AnswerBox = (item) => {
	const html = src_default.sanitize(item.item.content ?? "").replace(/#xs#/g, "<div data-component=\"xs\"></div>");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-12 justify-between gap-6 border-b pb-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-row items-start justify-between col-span-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex itesm-start gap-4 w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, {
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
						src: item.item.avatar || "",
						alt: "item.avatar"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: " capitalize font-semibold",
						children: item.item.nikename
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex text-[#38443a] gap-2 text-xs text-nowrap flex-col md:flex-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnswerUserInfoItem, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressIcon, {}),
								text: item.item.address || ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnswerUserInfoItem, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateIcon, {}),
								text: `${item.item.publishDate} day ago`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnswerUserInfoItem, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContributionIcon, {}),
								text: `${item.item.contributions} contributions`
							})
						]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden lg:block col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZanButton, { num: item.item?.contributions ?? 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuButton, {})]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "col-span-12 content",
			children: esm_default(html, { replace(domNode) {
				if (!("attribs" in domNode)) return;
				if (domNode.attribs?.["data-component"] === "xs") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XsButton, {});
			} })
		})]
	});
};
var AnswerUserInfoItem = (item) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-end",
		children: [item.icon, item.text]
	});
};
var ZanButton = (ctx) => {
	const [num, setNum] = (0, import_react.useState)(ctx.num);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: "flex items-center px-2 py-1 rounded-full hover:bg-[#ebebeb] cursor-pointer text-xs gap-1 h-8 active:bg-[#E0E0E0]",
		onClick: () => {
			setNum(num + 1);
		},
		type: "button",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LikeIcon, {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "",
			children: num
		})]
	});
};
var MenuButton = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-full hover:bg-[#ebebeb] cursor-pointer text-sm w-8 h-8 flex items-center justify-center active:bg-[#E0E0E0]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuIcon, {})
	});
};
var AiLogo = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 20 18",
		width: "20px",
		height: "20px",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 0.25C11.011 0.25 11.9909 0.390276 12.915 0.650391C12.4823 1.0997 12.0083 1.50843 11.498 1.87012C11.0136 1.79247 10.5132 1.75 10 1.75C5.35816 1.75 1.75 5.07654 1.75 9C1.75 10.4074 2.20681 11.7253 3.00586 12.8447C3.15052 13.0477 3.18502 13.3095 3.09766 13.543L2.17578 15.999L5.59766 15.3154L5.71777 15.3018C5.8381 15.2974 5.95865 15.3216 6.06836 15.374C7.23433 15.9311 8.57261 16.25 10 16.25C14.6418 16.25 18.25 12.9235 18.25 9C18.25 8.28544 18.1291 7.59109 17.9053 6.93262C18.2621 6.51978 18.6528 6.13732 19.0723 5.78809C19.507 6.77815 19.75 7.85938 19.75 9C19.75 13.9131 15.2993 17.75 10 17.75C8.44071 17.75 6.96319 17.4212 5.65137 16.834L1.14746 17.7354C0.880561 17.7887 0.605132 17.6936 0.428711 17.4863C0.2523 17.2789 0.202235 16.9913 0.297852 16.7363L1.55664 13.3779C0.728977 12.0942 0.25 10.599 0.25 9C0.25 4.0869 4.70071 0.25 10 0.25Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15.8313 0C16.1169 1.65015 17.6829 2.9552 19.663 3.1932C17.6829 3.43119 16.117 4.73615 15.8313 6.38624C15.5458 4.73619 13.98 3.4312 12 3.19312C13.98 2.95503 15.5458 1.65008 15.8313 0Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9.99982 4C10.3725 6.58392 12.416 8.62745 15 9.00012C12.4161 9.37278 10.3725 11.4162 9.99982 14C9.62716 11.4162 7.58379 9.3728 5 9C7.58383 8.62719 9.6272 6.5838 9.99982 4Z" })
		]
	});
};
var MapIcon = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		width: "24px",
		height: "24px",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M14.256 7.032A2.441 2.441 0 1 0 9.746 8.9a2.441 2.441 0 0 0 4.51-1.868m-2.615.065a.941.941 0 1 1 .72 1.738.941.941 0 0 1-.72-1.738"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M7.26 5.882 2.748 6.91v14.1l6.418-1.951 5.64 1.714 6.446-1.47V5.708l-4.185.954a5.34 5.34 0 0 0-5.066-3.67 5.34 5.34 0 0 0-4.741 2.89M6.73 7.54a5 5 0 0 0-.053.745c0 1.265.506 2.476 1.163 3.536l-3.592.955v-4.67zm10.592.6q.003.073.002.145c0 1.573-.782 3.063-1.663 4.284l-.077.105v.353l4.168-.95v-4.49zm-3.288 6.368c-.363.386-.706.73-.996 1.019l-.057.057-.002.002-.987.98-.974-.998-.03-.03a44 44 0 0 1-1.072-1.093v3.273l4.168 1.266v-4.46zm.41-2.817c-.778 1.077-1.72 2.028-2.437 2.745-.72-.716-1.676-1.675-2.462-2.765-.814-1.128-1.368-2.294-1.368-3.386 0-2.082 1.717-3.795 3.824-3.795s3.823 1.713 3.823 3.795c0 1.098-.56 2.27-1.38 3.406m5.308 1.924-4.168.95v4.491l4.168-.95zm-15.504.713 4.168-1.108v4.498l-4.168 1.266z"
		})]
	});
};
var UsdIcon = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		width: "20px",
		height: "20px",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M9.31 9.82h4.178c-.069-1.591-.356-2.993-.766-4.017-.237-.593-.501-1.023-.756-1.293-.211-.223-.38-.3-.5-.32h-.133c-.12.02-.289.097-.5.32-.255.27-.519.7-.756 1.293-.41 1.024-.697 2.426-.767 4.017m-.374-5.14q-.135.272-.252.566C8.194 6.472 7.88 8.07 7.81 9.82H5.055a6.39 6.39 0 0 1 3.88-5.14m2.301-1.989a7.883 7.883 0 0 0-7.726 7.88 7.88 7.88 0 0 0 7.884 7.885c.584 0 .871-.014 1.11-.074.124-.031.172-.049.213-.064.058-.02.099-.036.312-.073l-.26-1.477a4 4 0 0 0-.628.159c-.031.007-.132.029-.743.029-.121 0-.313-.06-.566-.327-.255-.27-.519-.699-.756-1.292-.41-1.025-.697-2.426-.767-4.017h4.203a4.7 4.7 0 0 1-.113.843 6 6 0 0 1-.112.413l-.012.04-.004.016c-.034.114-.089.298-.1.478l1.498.088v.006s.007-.035.044-.161l.012-.04c.038-.126.09-.298.136-.505.072-.313.134-.698.152-1.178h2.734a4.2 4.2 0 0 1-.195.949c-.055.16-.11.28-.166.403l-.004.01-.01.02c-.046.101-.132.288-.161.486l1.484.219-.005.026s.012-.032.057-.13l.008-.018c.056-.123.137-.3.216-.529.168-.49.31-1.168.31-2.186a7.88 7.88 0 0 0-7.72-7.879 2 2 0 0 0-.325 0m2.626 1.99q.134.271.252.565c.49 1.226.805 2.824.875 4.574h2.75a6.38 6.38 0 0 0-3.877-5.14M8.94 16.466a8 8 0 0 1-.256-.573c-.49-1.227-.805-2.824-.875-4.574H5.055a6.39 6.39 0 0 0 3.885 5.147"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M20.489 12.343h-8.75v6.648h5.255l3.495 2.325zm-1.5 1.5v4.674l-1.542-1.026H13.24v-3.648z"
		})]
	});
};
var MtyLogo = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 561 86",
		"aria-hidden": "true",
		className: "max-w-50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#002B11",
			d: "M557.238 66.412a3.016 3.016 0 1 0-.002 6.032 3.016 3.016 0 0 0 .002-6.032m0 5.56a2.544 2.544 0 1 1 0-5.088 2.544 2.544 0 0 1 0 5.088m.98-3.057c0-.549-.392-.875-.966-.875h-.965v2.748h.475v-.997h.515l.498.997h.51l-.539-1.1a.8.8 0 0 0 .472-.773m-.985.456h-.467v-.91h.467c.317 0 .51.16.51.454s-.193.46-.51.46zm-355.142-40.85h5.233V38.88H201.2c-4.716 0-7.743 2.314-7.743 7.032v26.041h-11.195v-43.43h11.195v7.297c.98-5.162 4.54-7.298 8.634-7.298m22.485-10.327a6.764 6.764 0 0 1-6.767 6.762 6.763 6.763 0 0 1-6.761-6.762c0-3.828 2.936-6.854 6.764-6.854 3.827 0 6.764 3.026 6.764 6.854M212.229 28.52h11.161v43.431h-11.165zm41.912-.733a21.6 21.6 0 0 0-13.179 4.406V28.52h-11.163V84.7h11.163V68.28a21.6 21.6 0 0 0 13.179 4.407c12.399 0 22.443-10.051 22.443-22.45 0-12.397-10.044-22.448-22.443-22.448m-.983 34.644c-6.736 0-12.196-5.46-12.196-12.195s5.46-12.196 12.196-12.196 12.195 5.46 12.195 12.196-5.46 12.194-12.195 12.195m228.12-4.199c0 8.374-7.184 14.453-17.082 14.453s-17.444-6.223-17.444-15.133v-.242h10.925v.242c0 3.718 2.654 6.217 6.61 6.217 3.955 0 6.338-1.85 6.338-4.602 0-2.607-1.763-4.065-6.502-5.376l-6.24-1.702c-6.557-1.775-10.316-6.047-10.316-11.721 0-7.29 6.877-12.581 16.358-12.581 9.48 0 15.997 5.294 15.997 13.177v.247H469.63v-.247c0-2.676-2.507-4.772-5.705-4.772-3.36 0-5.705 1.542-5.705 3.751 0 2.21 1.67 3.58 5.956 4.695l6.516 1.787c8.75 2.335 10.586 7.71 10.586 11.807m-165.066-26.04a21.6 21.6 0 0 0-13.185-4.407c-12.399 0-22.449 10.052-22.449 22.45s10.053 22.449 22.449 22.449a21.6 21.6 0 0 0 13.179-4.407v3.673h11.164v-43.43h-11.164zm0 18.044c0 6.735-5.461 12.195-12.196 12.194-6.736 0-12.196-5.461-12.195-12.196 0-6.736 5.46-12.195 12.196-12.195 6.734.003 12.192 5.463 12.192 12.197zm51.49-18.044a21.6 21.6 0 0 0-13.178-4.407c-12.398 0-22.45 10.052-22.45 22.45s10.052 22.449 22.45 22.449a21.6 21.6 0 0 0 13.178-4.407v3.673h11.165v-58.89h-11.165zm-12.194 30.238c-6.735 0-12.195-5.459-12.196-12.194s5.459-12.195 12.194-12.197c6.735 0 12.195 5.46 12.196 12.195s-5.458 12.196-12.194 12.196m75.214-33.906h11.165v43.426h-11.165zm12.347-10.327a6.764 6.764 0 1 1-13.528 0c0-3.828 2.937-6.854 6.764-6.854s6.758 3.021 6.758 6.849zm64.037 9.593c-12.398 0-22.449 10.051-22.449 22.45s10.051 22.449 22.449 22.449 22.443-10.051 22.443-22.45c0-12.397-10.053-22.453-22.449-22.453zm0 34.645c-6.735 0-12.195-5.46-12.195-12.195s5.46-12.196 12.195-12.196 12.196 5.46 12.196 12.196c-.003 6.734-5.464 12.193-12.198 12.19h-.004zM187.74 23.025h-15.856v48.927h-11.127V23.025H144.9v-9.963h42.836zm226.576 5.496h11.729l-14.987 43.431h-13.431l-14.906-43.43h11.729l9.934 31.537zm140.232 0h5.233V38.88h-6.123c-4.717 0-7.744 2.314-7.744 7.032v26.041H534.72v-43.43h11.194v7.297c.979-5.162 4.54-7.298 8.634-7.298M44.508 49.661c0 6.436-5.218 11.654-11.653 11.654s-11.653-5.218-11.653-11.654c0-6.435 5.218-11.654 11.653-11.654s11.653 5.219 11.653 11.654m54.028-11.654c-6.435 0-11.653 5.219-11.653 11.654 0 6.436 5.218 11.654 11.653 11.654s11.653-5.218 11.653-11.654c-.002-6.432-5.215-11.647-11.647-11.65zm32.855 11.654c0 18.136-14.715 32.84-32.855 32.84a32.7 32.7 0 0 1-22.31-8.74L65.71 85.201 55.19 73.748A32.7 32.7 0 0 1 32.873 82.5C14.746 82.5.036 67.797.036 49.66a32.75 32.75 0 0 1 10.71-24.27L0 13.698h23.876c25.263-17.194 58.467-17.194 83.73 0h23.814L120.675 25.39a32.75 32.75 0 0 1 10.716 24.271m-76.305 0c0-12.273-9.95-22.225-22.223-22.225S10.64 37.388 10.64 49.661s9.95 22.225 22.223 22.225 22.222-9.948 22.223-22.221zm35.283-33.18a64.13 64.13 0 0 0-49.326 0c14.03 5.37 24.667 17.914 24.667 32.54 0-14.625 10.635-27.17 24.66-32.54m30.395 33.179c0-12.274-9.95-22.225-22.223-22.225s-22.223 9.95-22.223 22.225c0 12.273 9.95 22.225 22.223 22.225s22.223-9.952 22.223-22.225"
		})
	});
};
var MtyGoodIcon = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		width: "20px",
		height: "20px",
		"aria-hidden": "true",
		fill: "#b61753",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "m14.232 4.13-2.603-2.134L9.037 4.13l-3.358-.195-.848 3.253L2 8.987l1.227 3.142L2 15.26l2.832 1.813.849 3.244 3.357-.195 2.592 2.133 2.603-2.133 3.358.195.849-3.244 2.832-1.812-1.227-3.13 1.227-3.143-2.833-1.8-.847-3.253zm-3.62 11.833 5.195-5.196-1.414-1.414-3.784 3.784-1.753-1.745-1.412 1.417z"
		})
	});
};
var MtyInfoIcon = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		width: "16px",
		height: "16px",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M11 10v7h2v-7zm-.034-2.952a1.25 1.25 0 0 0-.216.692A1.24 1.24 0 0 0 12 9a1.25 1.25 0 1 0-1.034-1.952" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0"
		})]
	});
};
var MtyCircle = ({ num = 0 }) => {
	const safeNum = num;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${safeNum * 28} 24`,
		width: safeNum * 26 * .8,
		height: 24 * .8,
		"aria-labelledby": "bubble-rating",
		"data-automation": "bubbleRatingImage",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "bubbles" }), Array.from({ length: safeNum }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12z",
			transform: `translate(${index * 26} 0)`,
			fill: "#00852f"
		}, index.toString()))]
	});
};
/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: false positive */
var AdpageAsk = (item) => {
	const query = useSuspenseQuery(orpc.adpageWithReplyRoute.get.queryOptions({ input: { pageid: item.num } }));
	const safeHtml = src_default.sanitize(query.data?.content || "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-4 gap-6 items-start justify-between py-8 border-b mb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-4 flex-col col-span-4 lg:col-span-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "scroll-m-20 text-xl lg:text-3xl font-bold",
					children: query.data?.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "items-center gap-1 hidden lg:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "",
							children: (query.data?.star ?? 0).toFixed(1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MtyCircle, { num: query.data?.star ?? 5 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "underline cursor-pointer",
							children: [
								"(",
								(query.data?.view ?? 0).toLocaleString(),
								" reviews)"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center ml-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MtyGoodIcon, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "ml-1",
									children: "Recommended by 99% of travelers"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "cursor-pointer ml-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MtyInfoIcon, {})
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden lg:flex items-center gap-4 col-span-1 justify-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewButton, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "col-span-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { dangerouslySetInnerHTML: { __html: safeHtml } })
			})
		]
	});
};
var SaveButton = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center cursor-pointer",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 24 24",
				width: "20px",
				height: "20px",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fillRule: "evenodd",
					clipRule: "evenodd",
					d: "M3.798 5.166A5.77 5.77 0 0 1 7.72 3.63c1.455 0 2.857.548 3.922 1.536l.005.005.341.322.332-.317a5.77 5.77 0 0 1 3.928-1.54c1.458 0 2.862.55 3.928 1.54l.004.004c1.093 1.032 1.598 2.324 1.569 3.662-.03 1.323-.579 2.643-1.5 3.785-.884 1.096-2.85 2.943-4.547 4.478a185 185 0 0 1-3.153 2.785l-.069.059-.489-.569.489.569-.485.416-.488-.412a102 102 0 0 1-7.75-7.288l-.021-.021-.02-.023c-1.725-2.115-2.203-5.32.08-7.453zm8.19 13.226.472-.412a184 184 0 0 0 2.236-1.988c1.72-1.556 3.59-3.32 4.385-4.306.757-.939 1.147-1.948 1.168-2.877.02-.912-.313-1.795-1.097-2.536a4.27 4.27 0 0 0-2.904-1.138c-1.08 0-2.117.407-2.903 1.136l-1.35 1.292-1.375-1.3a4.27 4.27 0 0 0-2.9-1.133 4.27 4.27 0 0 0-2.901 1.135c-1.507 1.408-1.353 3.659.042 5.385a101 101 0 0 0 7.127 6.742"
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "underline font-semibold",
			children: "Save"
		})]
	});
};
var ReviewButton = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center cursor-pointer border rounded-full px-4 py-2 border-[#000000]! hover:bg-[#EBEBEB] active:bg-[#E0E0E0]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 24 24",
				width: "20px",
				height: "20px",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fillRule: "evenodd",
					clipRule: "evenodd",
					d: "M13.788 7.293 6.19 14.868l-.816 3.746 3.724-.839 7.588-7.583zm3.96 1.84-2.898-2.9.556-.554A2.32 2.32 0 0 1 17.02 5c.378 0 .73.104 1.031.315l.01.007.012.008c1.12.757 1.221 2.26.326 3.151zm-7.896 10.01-5.99 1.35q-.032.009-.064.007a.297.297 0 0 1-.29-.36l1.31-6.023 9.529-9.5A3.82 3.82 0 0 1 17.02 3.5c.66 0 1.318.184 1.893.587a3.536 3.536 0 0 1 .546 5.457z"
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "",
			children: "Review"
		})]
	});
};
var BottomButton = () => {
	const { setOpen } = useOpenStore();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed bottom-0 left-0 right-0 p-4 flex md:hidden justify-center max-w-svw",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full mx-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				className: "w-full outline-0 bg-[#00852F] text-xl h-12 rounded-full",
				onClick: () => setOpen(true),
				children: ["Contact ", useSuspenseQuery(orpc.adSalerRoute.current_saler.queryOptions())?.data?.name]
			})
		})
	});
};
var Header = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-row items-center justify-between",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4 w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MtyLogo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden xl:flex border border-[#768a79]! px-4 max-w-80 w-full rounded-full gap-2 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						size: 28,
						strokeWidth: 1,
						className: ""
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Search",
						className: "focus:border-none focus:outline-0 bg-transparent w-full py-3"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden xl:flex flex-row items-center gap-1 w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderButton, {
						name: "Plan with AI",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiLogo, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderButton, { name: "Rewards" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderButton, { name: "Discover" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderButton, { name: "Review" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderButton, {
						name: "USD",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsdIcon, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInButton, { name: "Sign in" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "xl:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					size: "icon-lg",
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
				})
			})
		]
	});
};
var HeaderButton = (ctx) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "hover:bg-[#e5e5e5] py-2 px-2 rounded-full text-[#002b11] font-semibold hover:text-[#1a4029] flex items-center gap-2 active:bg-[#cccccc] transition-all duration-200",
		children: [ctx.icon && ctx.icon, ctx.name]
	});
};
var SignInButton = (ctx) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "bg-[#002b11] hover:bg-[#143c24] py-2 px-4 rounded-full text-[#e3e3e3] font-semibold hover:text-[#e3e3e3] flex items-center gap-2 transition-all duration-200 active:bg-[1f442e]",
		children: ctx.name
	});
};
var AdPageNav = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex border-b gap-5 border-[#fefefe] overflow-x-scroll lg:overflow-x-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
					name: "Tibet",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapIcon, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, { name: "Things to Do" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, { name: "Hotels" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, { name: "Restaurants" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, { name: "Cruises" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, { name: "Forums" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {})]
	});
};
var NavButton = (ctx) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-1 font-semibold text-[#002b11] transition-all duration-200 hover:cursor-pointer py-3 text-nowrap", "border-b-2 border-b-transparent! hover:border-b-[#000000]!", ctx.name === "Things to Do" && "border-b-2 border-[#000000]!"),
		children: [ctx?.icon && ctx.icon, ctx.name]
	});
};
var NavLink = () => {
	const breadcrumbs = [
		"Asian",
		"China",
		"Tibet",
		"Tibet Tours"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap items-center gap-1 text-[12px] text-[#002b11] py-3",
		children: breadcrumbs.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "hover:underline",
				children: item
			}), index !== breadcrumbs.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
				size: 12,
				strokeWidth: 1,
				className: "text-gray-400"
			})]
		}, item))
	});
};
function RouteComponent() {
	const params = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-12 gap-4 max-w-300 mx-auto p-4 md:p-8 ",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdPageNav, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdpageAsk, { num: Number(params.pageid) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-12 xl:col-span-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnsWer, { num: Number(params.pageid) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-4 sticky top-4 h-fit hidden xl:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SalerDrawer, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomButton, {})
	] });
}
//#endregion
export { RouteComponent as component };
