import { ChevronRight } from "lucide-react";
import type React from "react";
import { cn } from "#/lib/utils";
import { MapIcon } from "./svg-icon";

export const AdPageNav = () => {
	return (
		<div className="">
			<div className="flex border-b gap-5 border-[#fefefe]">
				<NavButton name="Florence" icon={<MapIcon />} />
				<NavButton name="Things to Do" />
				<NavButton name="Hotels" />
				<NavButton name="Restaurants" />
				<NavButton name="Cruises" />
				<NavButton name="Forums" />
			</div>

			<NavLink />
		</div>
	);
};

const NavButton = (ctx: { name: string; icon?: React.ReactNode }) => {
	return (
		<div
			className={cn(
				"flex items-center gap-1 font-semibold text-[#002b11] transition-all duration-200 hover:cursor-pointer py-3",
				"border-b-2 border-b-transparent! hover:border-b-[#000000]!",
				ctx.name === "Things to Do" && "border-b-2 border-[#000000]!",
			)}
		>
			{ctx?.icon && ctx.icon}
			{ctx.name}
		</div>
	);
};

const NavLink = () => {
	const breadcrumbs = [
		"Europe",
		"Italy",
		"Tuscany",
		"Province of Florence",
		"Florence",
		"Things to Do in Florence",
		"Florence Tours",
	];

	return (
		<div className="flex flex-wrap items-center gap-1 text-[12px] text-[#002b11] py-3">
			{breadcrumbs.map((item, index) => (
				<div key={item} className="flex items-center gap-1">
					<button type="button" className="hover:underline">
						{item}
					</button>

					{index !== breadcrumbs.length - 1 && (
						<ChevronRight size={12} strokeWidth={1} className="text-gray-400" />
					)}
				</div>
			))}
		</div>
	);
};
