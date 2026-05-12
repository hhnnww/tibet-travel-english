import { Search } from "lucide-react";
import type React from "react";
import { AiLogo, MtyLogo, UsdIcon } from "./svg-icon";
export const Header = () => {
	return (
		<div className="flex flex-row items-center justify-between">
			<div className="flex items-center gap-4 w-full">
				<MtyLogo />

				<div className="flex border border-[#768a79]! px-4 max-w-80 w-full rounded-full gap-2 items-center">
					<Search size={28} strokeWidth={1} className="" />
					<input
						type="text"
						placeholder="Search"
						className="focus:border-none focus:outline-0 bg-transparent w-full py-3"
					/>
				</div>
			</div>
			<div className="flex flex-row items-center gap-1 w-full">
				<HeaderButton name="Plan with AI" icon={<AiLogo />} />
				<HeaderButton name="Rewards" />
				<HeaderButton name="Discover" />
				<HeaderButton name="Review" />
				<HeaderButton name="USD" icon={<UsdIcon />} />
				<SignInButton name="Sign in" />
			</div>
		</div>
	);
};

const HeaderButton = (ctx: { name: string; icon?: React.ReactNode }) => {
	return (
		<button
			type="button"
			className="hover:bg-[#e5e5e5] py-2 px-2 rounded-full text-[#002b11] font-semibold hover:text-[#1a4029] flex items-center gap-2 active:bg-[#cccccc] transition-all duration-200"
		>
			{ctx.icon && ctx.icon}
			{ctx.name}
		</button>
	);
};

const SignInButton = (ctx: { name: string }) => {
	return (
		<button
			type="button"
			className="bg-[#002b11] hover:bg-[#143c24] py-2 px-4 rounded-full text-[#e3e3e3] font-semibold hover:text-[#e3e3e3] flex items-center gap-2 transition-all duration-200 active:bg-[1f442e]"
		>
			{ctx.name}
		</button>
	);
};
