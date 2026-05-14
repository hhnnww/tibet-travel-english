import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { Button } from "#/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
} from "#/components/ui/drawer";
import { orpc } from "#/orpc/client";
import { useOpenStore } from "./draw-store";
import { Sidebar } from "./sidebr";

export const SalerDrawer = () => {
	const { open, setOpen } = useOpenStore();
	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerContent
				onCloseAutoFocus={(e) => {
					e.preventDefault();
				}}
			>
				<div className="flex flex-row justify-center p-4 lg:p-8">
					<div className="w-svw lg:max-w-200">
						<Sidebar />
					</div>
				</div>

				<DrawerFooter className="pt-2">
					<DrawerClose>
						<Button variant="outline" className={"rounded-full h-12 w-12"}>
							<X />
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export const XsButton = () => {
	const { open, setOpen } = useOpenStore();
	const query = useQuery(orpc.adSalerRoute.current_saler.queryOptions());
	return (
		<button
			type="button"
			onClick={() => {
				setOpen(!open);
			}}
		>
			<span className="text-[#00852F] font-bold">{query?.data?.name}</span>
			<span className="text-[#333] text-xs"> (click to contact)</span>
		</button>
	);
};
