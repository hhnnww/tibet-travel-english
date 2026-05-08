import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Spinner } from "#/components/ui/spinner";
import { orpc } from "#/orpc/client";

export const AdreplyAdd = ({ pageid }: { pageid: number }) => {
	const qc = useQueryClient();
	const addMustation = useMutation(
		orpc.AdReplyRoute.new.mutationOptions({
			onSuccess: async () => {
				await qc.invalidateQueries(
					orpc.AdReplyRoute.list.queryOptions({ input: { pageId: pageid } }),
				);
			},
		}),
	);

	return (
		<Button
			onClick={async () => {
				await addMustation.mutateAsync({ pageId: pageid });
			}}
		>
			{addMustation.isPending ? (
				<Spinner data-icon="inline-start" />
			) : (
				<Plus className="size-4" />
			)}
			新建回复
		</Button>
	);
};
