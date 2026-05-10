import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserRoundPlus } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Spinner } from "#/components/ui/spinner";
import { orpc } from "#/orpc/client";

export const AdSalerAdd = () => {
	const qc = useQueryClient();
	const addsaler = useMutation(
		orpc.adSalerRoute.new.mutationOptions({
			onSuccess: async () => {
				await qc.invalidateQueries(orpc.adSalerRoute.list.queryOptions());
			},
		}),
	);
	return (
		<Button
			onClick={async () => {
				await addsaler.mutateAsync({});
			}}
		>
			{addsaler.isPending ? <Spinner /> : <UserRoundPlus />}
			新建销售
		</Button>
	);
};
