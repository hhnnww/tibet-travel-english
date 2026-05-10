import { createFileRoute } from "@tanstack/react-router";

import { orpc } from "#/orpc/client";

import { ImageList } from "./-adimage/image-list";
import { PageNavi } from "./-adimage/page-navi";
import { ImageUpload } from "./-adimage/update-image";

export const Route = createFileRoute("/_authLayout/admin/images/$page")({
	component: RouteComponent,

	loader: async (ctx) => {
		await ctx.context.queryClient.prefetchQuery(
			orpc.imagesRouter.list.queryOptions({
				input: {
					page: Number(ctx.params.page),
				},
			}),
		);
	},
});

function RouteComponent() {
	const params = Route.useParams();
	const page = Number(params.page);
	return (
		<div className="flex flex-col gap-12">
			<ImageUpload />
			<ImageList page={page} />
			<PageNavi page={page} />
		</div>
	);
}
