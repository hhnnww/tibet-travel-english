/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: false positive */
import type { InferRouterOutputs } from "@orpc/server";
import DOMPurify from "isomorphic-dompurify";
import type React from "react";
import { useState } from "react";
import { Avatar, AvatarImage } from "#/components/ui/avatar";
import type { AdReplyRoute } from "#/orpc/router/adreply-route";

export const AnsWer = (item: {
	items: InferRouterOutputs<typeof AdReplyRoute>["get"][];
}) => {
	return (
		<div className="flex flex-col gap-12">
			{item.items.map((item) => (
				<AnswerBox key={item.id} item={item} />
			))}
		</div>
	);
};

const AnswerBox = (item: {
	item: InferRouterOutputs<typeof AdReplyRoute>["get"];
}) => {
	const safeHtml = DOMPurify.sanitize(item.item.content ?? "");
	return (
		<div className="grid grid-cols-12 justify-between gap-6 border-b pb-10">
			<div className="flex flex-row items-start justify-between col-span-12">
				<div className="flex itesm-start gap-4 w-full">
					<div className="">
						<Avatar size="lg">
							<AvatarImage src={item.item.avatar || ""} alt="item.avatar" />
						</Avatar>
					</div>

					<div className="flex flex-col">
						<div className=" capitalize font-semibold">
							{item.item.nikename}
						</div>
						<div className="flex text-[#38443a] gap-2 text-xs">
							<AnswerUserInfoItem
								icon={
									<svg
										viewBox="0 0 24 24"
										width="16px"
										height="16px"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M8 4.75a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-3 1.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m11 .5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-3 1.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m-5 2.5a6.91 6.91 0 0 1 5.36 2.493 6.96 6.96 0 0 1 8.244 2.312l.146.199v4.996H2.25v-6.997l.147-.199A6.91 6.91 0 0 1 8 10.75m3.75 8.5h8.5v-2.995a5.46 5.46 0 0 0-8.5 0zm-1.5 0h-6.5v-4.994a5.41 5.41 0 0 1 4.245-2.006h.01a5.4 5.4 0 0 1 4.006 1.73 7 7 0 0 0-1.615 1.575l-.146.199z"
										></path>
									</svg>
								}
								text={item.item.address || ""}
							/>
							<AnswerUserInfoItem
								icon={
									<svg
										viewBox="0 0 24 24"
										width="16px"
										height="16px"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M8.007 2.75a.75.75 0 0 1 .748.752l-.002.748h2.512V3.5a.75.75 0 0 1 1.5 0v.75h2.472l-.002-.748a.75.75 0 1 1 1.5-.004l.002.752h4.018v17H3.245v-17h4.008l.002-.752a.75.75 0 0 1 .752-.748m-.758 3H4.745v14h14.51v-14h-2.513l.006 1.747-1.5.005-.006-1.752h-2.477V7.5h-1.5V5.75H8.749l-.004 1.752-1.5-.004zm-.004 6h5.5v5.5h-5.5zm1.5 1.5v2.5h2.5v-2.5z"
										></path>
									</svg>
								}
								text={`${item.item.publishDate} day ago`}
							/>
							<AnswerUserInfoItem
								icon={
									<svg
										viewBox="0 0 24 24"
										width="16px"
										height="16px"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M3.533 3.167h17.2v13.34H15.68l-3.685 3.799-3.392-3.799h-5.07zm1.5 1.5v10.34h4.242l2.766 3.097 3.004-3.097h4.188V4.667z"
										></path>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M10.978 8.556a.2.2 0 0 1-.148.108l-2.144.33a.2.2 0 0 0-.11.339l1.54 1.526a.2.2 0 0 1 .057.175l-.35 2.14a.2.2 0 0 0 .29.21l1.928-.993a.2.2 0 0 1 .183 0l1.928.994a.2.2 0 0 0 .29-.21l-.35-2.141a.2.2 0 0 1 .056-.175l1.542-1.526a.2.2 0 0 0-.11-.34l-2.145-.33a.2.2 0 0 1-.148-.107L12.31 6.62a.2.2 0 0 0-.357 0zm1.155.966a1.7 1.7 0 0 1-.741.538c.172.259.27.56.283.871a1.7 1.7 0 0 1 .916 0 1.7 1.7 0 0 1 .283-.871 1.7 1.7 0 0 1-.741-.538"
										></path>
									</svg>
								}
								text={`${item.item.contributions} contributions`}
							/>
						</div>
					</div>
				</div>

				<div className="col-span-2">
					<div className="flex gap-1 items-center">
						<ZanButton num={item.item?.contributions ?? 0} />
						<MenuButton />
					</div>
				</div>
			</div>

			<div className="col-span-12 content">
				<div dangerouslySetInnerHTML={{ __html: safeHtml }} />
			</div>
		</div>
	);
};

const AnswerUserInfoItem = (item: { icon: React.ReactNode; text: string }) => {
	return (
		<div className="flex items-end">
			{item.icon}
			{item.text}
		</div>
	);
};

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
				<svg viewBox="0 0 24 24" width="20px" height="20px" aria-hidden="true">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="m14.539 4.661-.004.04-.003.04-.006.072a1 1 0 0 1-.016.116l-1.03 5.017h6.765a.267.267 0 0 1 .264.301l-1.311 8.533v.002a.27.27 0 0 1-.267.227H7.708v-7.9l5.224-5.017 1.027-.963c.066-.054.134-.117.18-.161l.022-.02c.07-.066.132-.122.195-.172a.7.7 0 0 1 .183-.115m.692-1.49c.246.097.41.239.51.334.22.206.31.465.349.618.044.172.058.342.058.478v.038l-.003.038a9 9 0 0 0-.024.28 3 3 0 0 1-.043.293l-.635 3.095h4.802a1.867 1.867 0 0 1 1.849 2.13l-.002.009-1.312 8.538a1.87 1.87 0 0 1-1.862 1.588H6.108V10.427l5.725-5.5 1.081-1.012.03-.023.032-.029c.02-.017.038-.035.063-.058l.03-.028c.073-.068.175-.163.292-.256.218-.172.59-.425 1.068-.458.29-.02.557.01.802.108M2.688 10.013a.8.8 0 0 1 .8.8v10.13h-1.6v-10.13a.8.8 0 0 1 .8-.8"
					></path>
				</svg>
			</div>

			<div className="">{num}</div>
		</button>
	);
};

const MenuButton = () => {
	return (
		<div className="rounded-full hover:bg-[#ebebeb] cursor-pointer text-sm w-8 h-8 flex items-center justify-center active:bg-[#E0E0E0]">
			<svg viewBox="0 0 24 24" width="20px" height="20px" aria-hidden="true">
				<path d="M5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4m14 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4m-7 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path>
			</svg>
		</div>
	);
};
