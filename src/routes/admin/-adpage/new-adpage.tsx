import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "#/components/ui/button";
import { Spinner } from "#/components/ui/spinner";
import { orpc } from "#/orpc/client";

export const NewAdpageButton = () => {
	const qc = useQueryClient();
	const newMutation = useMutation(
		orpc.adpageAdd.mutationOptions({
			onSuccess: async () =>
				await qc.invalidateQueries(orpc.adpageList.queryOptions({ input: {} })),
		}),
	);

	return (
		<Button
			onClick={async () => {
				return await newMutation.mutateAsync({});
			}}
		>
			{newMutation.isPending && <Spinner data-icon="inline-start" />}
			新建广告页面
		</Button>
	);
};
