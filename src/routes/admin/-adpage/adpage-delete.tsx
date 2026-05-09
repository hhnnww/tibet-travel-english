import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FileXCorner } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Spinner } from "#/components/ui/spinner";
import { orpc } from "#/orpc/client";

export const AdpageDelete = ({ pageId }: { pageId: number }) => {
	const qc = useQueryClient();
	// 查询
	const replyQuery = useQuery(
		orpc.AdReplyRoute.list.queryOptions({ input: { pageId } }),
	);

	// 删除 mutation
	const deleteReply = useMutation(orpc.AdReplyRoute.delete.mutationOptions());
	const deletePage = useMutation(orpc.adpageRoute.delete.mutationOptions());

	// ✅ 并行删除所有回复 + 最后删除页面
	const handleDeleteReplies = async () => {
		if (!confirm("确定删除吗？")) return;
		if (!replyQuery.data) return;
		const deletePromises = replyQuery.data.map((item) =>
			deleteReply.mutateAsync({ id: item.id }),
		);
		await Promise.all(deletePromises);
		await deletePage.mutateAsync({ id: pageId });
		await qc.invalidateQueries(
			orpc.adpageRoute.list.queryOptions({ input: {} }),
		);
	};

	return (
		<Button
			variant={"destructive"}
			onClick={handleDeleteReplies}
			disabled={deleteReply.isPending || deletePage.isPending}
		>
			{deleteReply.isPending || deletePage.isPending ? (
				<Spinner data-icon="inline-start" />
			) : (
				<FileXCorner />
			)}
			{deleteReply.isPending || deletePage.isPending ? "删除中..." : "删除"}
		</Button>
	);
};
