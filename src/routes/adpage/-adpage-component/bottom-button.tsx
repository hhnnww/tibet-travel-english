import { useQuery } from "@tanstack/react-query";
import { Button } from "#/components/ui/button";
import { orpc } from "#/orpc/client";
import { useOpenStore } from "./draw-store";

export const BottomButton = () => {
	const { setOpen } = useOpenStore();
	const query = useQuery(orpc.adSalerRoute.current_saler.queryOptions());
	return (
		<div className="fixed bottom-0 left-0 right-0 p-4 flex md:hidden justify-center max-w-svw">
			{/* left-0 right-0 确保固定定位的容器撑满宽度，否则 mx-auto 无法在全屏范围内居中 */}
			<div className="w-full mx-auto">
				<Button
					className="w-full outline-0 bg-[#00852F] text-xl h-12 rounded-full"
					onClick={() => setOpen(true)}
				>
					Contact {query?.data?.name}
				</Button>
			</div>
		</div>
	);
};
