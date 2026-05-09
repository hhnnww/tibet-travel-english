import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FilePlusCorner } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Spinner } from "#/components/ui/spinner";
import { orpc } from "#/orpc/client";

export const NewAdpageButton = () => {
	const qc = useQueryClient();
	const newMutation = useMutation(
		orpc.adpageRoute.new.mutationOptions({
			onSuccess: async () =>
				await qc.invalidateQueries(
					orpc.adpageRoute.list.queryOptions({ input: {} }),
				),
		}),
	);

	return (
		<Button
			onClick={async () => {
				return await newMutation.mutateAsync({});
			}}
		>
			{newMutation.isPending ? (
				<Spinner data-icon="inline-start" />
			) : (
				<FilePlusCorner />
			)}
			新建广告页面
		</Button>
	);
};
