/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: false positive */

import type { InferRouterOutputs } from "@orpc/server";
import parse, {
	type Element,
	type HTMLReactParserOptions,
} from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import type React from "react";
import { useState } from "react";
import { Avatar, AvatarImage } from "#/components/ui/avatar";
import type { adpageWithReplyRoute } from "#/orpc/router/adpage-reply";
import type { AdReplyRoute } from "#/orpc/router/adreply-route";
import {
	AddressIcon,
	ContributionIcon,
	DateIcon,
	LikeIcon,
	MenuIcon,
} from "./answer-icon";
import { XsButton } from "./saler-drawer-button";

// 主组件：根据页面ID获取并渲染回复列表
export const AnsWer = (
	item: InferRouterOutputs<typeof adpageWithReplyRoute.get>,
) => {
	if (!item) return null;

	return (
		<div className="flex flex-col gap-12">
			{item.replies.map((item) => (
				<AnswerBox key={item.id} item={item} />
			))}
		</div>
	);
};

// 单个回复卡片组件
const AnswerBox = (item: {
	item: InferRouterOutputs<typeof AdReplyRoute>["get"];
}) => {
	// 净化 HTML 内容，并将自定义标记 #xs# 替换为 XsButton 组件占位符
	const safeHtml = DOMPurify.sanitize(item.item.content ?? "");
	const html = safeHtml.replace(/#xs#/g, '<div data-component="xs"></div>');

	const options: HTMLReactParserOptions = {
		replace(domNode) {
			if (!("attribs" in domNode)) return;
			const node = domNode as Element;
			// 如果节点包含 data-component="xs"，则渲染 XsButton
			if (node.attribs?.["data-component"] === "xs") {
				return <XsButton />;
			}
		},
	};

	return (
		<div className="grid grid-cols-12 justify-between gap-6 border-b pb-10">
			<div className="flex flex-row items-start justify-between col-span-12">
				<div className="flex itesm-start gap-4 w-full">
					<Avatar size="lg">
						<AvatarImage src={item.item.avatar || ""} alt="item.avatar" />
					</Avatar>

					<div className="flex flex-col">
						<div className=" capitalize font-semibold">
							{item.item.nikename}
						</div>
						<div className="flex text-[#38443a] gap-2 text-xs text-nowrap flex-col md:flex-row">
							{/* 用户信息项：地址、发布时间、贡献数 */}
							<AnswerUserInfoItem
								icon={<AddressIcon />}
								text={item.item.address || ""}
							/>
							<AnswerUserInfoItem
								icon={<DateIcon />}
								text={`${item.item.publishDate} day ago`}
							/>
							<AnswerUserInfoItem
								icon={<ContributionIcon />}
								text={`${item.item.contributions} contributions`}
							/>
						</div>
					</div>
				</div>

				<div className="hidden lg:block col-span-2">
					<div className="flex gap-1 items-center">
						{/* 点赞按钮和菜单按钮 */}
						<ZanButton num={item.item?.contributions ?? 0} />
						<MenuButton />
					</div>
				</div>
			</div>

			<div className="col-span-12 content">{parse(html, options)}</div>
		</div>
	);
};

// 用户信息单项组件：图标 + 文本
const AnswerUserInfoItem = (item: { icon: React.ReactNode; text: string }) => {
	return (
		<div className="flex items-end">
			{item.icon}
			{item.text}
		</div>
	);
};

// 点赞按钮组件：点击后本地状态增加计数
const ZanButton = (ctx: { num: number }) => {
	const [num, setNum] = useState(ctx.num);
	return (
		<button
			className="flex items-center px-2 py-1 rounded-full hover:bg-[#ebebeb] cursor-pointer text-xs gap-1 h-8 active:bg-[#E0E0E0]"
			onClick={() => {
				setNum(num + 1);
			}}
			type="button"
		>
			<div className="">
				<LikeIcon />
			</div>

			<div className="">{num}</div>
		</button>
	);
};

// 菜单按钮组件
const MenuButton = () => {
	return (
		<div className="rounded-full hover:bg-[#ebebeb] cursor-pointer text-sm w-8 h-8 flex items-center justify-center active:bg-[#E0E0E0]">
			<MenuIcon />
		</div>
	);
};
