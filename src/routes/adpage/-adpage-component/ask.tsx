/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: false positive */
import type { InferRouterOutputs } from "@orpc/server";
import DOMPurify from "dompurify";
import type { adpageWithReplyRoute } from "#/orpc/router/adpage-reply.ts";

export const AdpageAsk = ({
	item,
}: {
	item: InferRouterOutputs<typeof adpageWithReplyRoute>["get"];
}) => {
	const safeHtml = DOMPurify.sanitize(item?.content ?? "");
	return (
		<div className="mt-10">
			<h1 className="scroll-m-20 text-2xl font-bold tracking-tight text-balance">
				{item?.title}
			</h1>

			<div className="">
				<div dangerouslySetInnerHTML={{ __html: safeHtml }} />
			</div>
		</div>
	);
};
