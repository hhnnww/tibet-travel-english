/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: false positive */
import { useSuspenseQuery } from "@tanstack/react-query";
import DOMPurify from "isomorphic-dompurify";
import { orpc } from "#/orpc/client";
import { MtyCircle, MtyGoodIcon, MtyInfoIcon } from "./svg-icon";

export const AdpageAsk = (item: { num: number }) => {
	const query = useSuspenseQuery(
		orpc.adpageWithReplyRoute.get.queryOptions({
			input: {
				pageid: item.num,
			},
		}),
	);
	const safeHtml = DOMPurify.sanitize(query.data?.content || "");

	return (
		<div className="grid grid-cols-4 gap-6 items-start justify-between lg:py-8 border-b lg:mb-8 mb-4 pb-4">
			<div className="flex gap-4 flex-col col-span-4 lg:col-span-3">
				<h1 className="scroll-m-20 text-xl lg:text-3xl font-bold">
					{query.data?.title}
				</h1>
				<div className="items-center gap-1 hidden lg:flex">
					<div className="">{(query.data?.star ?? 0).toFixed(1)}</div>
					<MtyCircle num={query.data?.star ?? 5} />
					<div className="underline cursor-pointer">
						({(query.data?.view ?? 0).toLocaleString()} reviews)
					</div>
					<div className="flex items-center ml-4">
						<MtyGoodIcon />
						<div className="ml-1">Recommended by 99% of travelers</div>
						<div className="cursor-pointer ml-1">
							<MtyInfoIcon />
						</div>
					</div>
				</div>
			</div>

			<div className="hidden lg:flex items-center gap-4 col-span-1 justify-end">
				<SaveButton />
				<ReviewButton />
			</div>

			<div className="col-span-4">
				<div dangerouslySetInnerHTML={{ __html: safeHtml }} />
			</div>
		</div>
	);
};

const SaveButton = () => {
	return (
		<div className="flex items-center cursor-pointer">
			<div className="">
				<svg viewBox="0 0 24 24" width="20px" height="20px" aria-hidden="true">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M3.798 5.166A5.77 5.77 0 0 1 7.72 3.63c1.455 0 2.857.548 3.922 1.536l.005.005.341.322.332-.317a5.77 5.77 0 0 1 3.928-1.54c1.458 0 2.862.55 3.928 1.54l.004.004c1.093 1.032 1.598 2.324 1.569 3.662-.03 1.323-.579 2.643-1.5 3.785-.884 1.096-2.85 2.943-4.547 4.478a185 185 0 0 1-3.153 2.785l-.069.059-.489-.569.489.569-.485.416-.488-.412a102 102 0 0 1-7.75-7.288l-.021-.021-.02-.023c-1.725-2.115-2.203-5.32.08-7.453zm8.19 13.226.472-.412a184 184 0 0 0 2.236-1.988c1.72-1.556 3.59-3.32 4.385-4.306.757-.939 1.147-1.948 1.168-2.877.02-.912-.313-1.795-1.097-2.536a4.27 4.27 0 0 0-2.904-1.138c-1.08 0-2.117.407-2.903 1.136l-1.35 1.292-1.375-1.3a4.27 4.27 0 0 0-2.9-1.133 4.27 4.27 0 0 0-2.901 1.135c-1.507 1.408-1.353 3.659.042 5.385a101 101 0 0 0 7.127 6.742"
					></path>
				</svg>
			</div>
			<div className="underline font-semibold">Save</div>
		</div>
	);
};

const ReviewButton = () => {
	return (
		<div className="flex items-center cursor-pointer border rounded-full px-4 py-2 border-[#000000]! hover:bg-[#EBEBEB] active:bg-[#E0E0E0]">
			<div className="">
				<svg viewBox="0 0 24 24" width="20px" height="20px" aria-hidden="true">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M13.788 7.293 6.19 14.868l-.816 3.746 3.724-.839 7.588-7.583zm3.96 1.84-2.898-2.9.556-.554A2.32 2.32 0 0 1 17.02 5c.378 0 .73.104 1.031.315l.01.007.012.008c1.12.757 1.221 2.26.326 3.151zm-7.896 10.01-5.99 1.35q-.032.009-.064.007a.297.297 0 0 1-.29-.36l1.31-6.023 9.529-9.5A3.82 3.82 0 0 1 17.02 3.5c.66 0 1.318.184 1.893.587a3.536 3.536 0 0 1 .546 5.457z"
					></path>
				</svg>
			</div>
			<div className="">Review</div>
		</div>
	);
};
