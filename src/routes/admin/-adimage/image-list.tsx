import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Copy, Trash } from "lucide-react";
import { useState } from "react";

import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Spinner } from "#/components/ui/spinner";

import { orpc } from "#/orpc/client";

export const ImageList = ({ page }: { page: number }) => {
	const [copiedUrl, setCopiedUrl] = useState("");

	const qc = useQueryClient();

	const images = useQuery(
		orpc.imagesRouter.list.queryOptions({
			input: {
				page,
			},
		}),
	);

	const deleteMutation = useMutation(
		orpc.imagesRouter.delete.mutationOptions({
			onSuccess: async () => {
				await qc.invalidateQueries(
					orpc.imagesRouter.list.queryOptions({
						input: { page },
					}),
				);
			},
		}),
	);

	const handleCopy = async (url: string) => {
		await navigator.clipboard.writeText(url);

		setCopiedUrl(url);

		setTimeout(() => {
			setCopiedUrl("");
		}, 1500);
	};

	if (images.isPending) {
		return (
			<div className="flex items-center justify-center py-20">
				<Spinner className="size-6" />
			</div>
		);
	}

	return (
		<div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
			{images.data?.items?.map((item) => {
				const isDeleting =
					deleteMutation.isPending &&
					deleteMutation.variables?.key === item.key;

				return (
					<div
						key={item.key}
						className="group overflow-hidden rounded-xl gap-2 flex flex-col"
					>
						{/* 图片 */}
						<div className="relative aspect-square overflow-hidden bg-muted">
							<div className="flex h-full w-full items-center justify-center">
								<img
									src={item.url}
									alt={item.key}
									className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-[1.03]"
									loading="lazy"
								/>
							</div>

							{/* 删除按钮 */}
							<div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
								<Button
									size="icon"
									variant="secondary"
									className="size-8"
									disabled={isDeleting}
									onClick={async () => {
										await deleteMutation.mutateAsync({
											key: item.key as string,
										});
									}}
								>
									{isDeleting ? (
										<Spinner className="size-4" />
									) : (
										<Trash className="size-4" />
									)}
								</Button>
							</div>
						</div>

						{/* URL */}
						<div className="flex gap-2">
							<Input
								value={item.url}
								readOnly
								className="h-9"
								onClick={(event) => {
									event.currentTarget.select();
								}}
							/>

							<Button
								type="button"
								size="icon"
								variant="outline"
								className="shrink-0"
								onClick={() => {
									handleCopy(item.url);
								}}
							>
								{copiedUrl === item.url ? (
									<Check className="size-4" />
								) : (
									<Copy className="size-4" />
								)}
							</Button>
						</div>
					</div>
				);
			})}
		</div>
	);
};
