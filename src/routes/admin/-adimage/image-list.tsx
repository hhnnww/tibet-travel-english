import { useQuery } from "@tanstack/react-query";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";

import { orpc } from "#/orpc/client";

export const ImageList = ({ page }: { page: number }) => {
	const [copiedUrl, setCopiedUrl] = useState("");

	const images = useQuery(
		orpc.imagesRouter.list.queryOptions({
			input: {
				page,
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
	return (
		<div className="grid grid-cols-4 gap-6">
			{images.data?.items?.map((item) => (
				<div className="flex flex-col gap-2" key={item.key}>
					<div className="flex aspect-square items-center justify-center overflow-hidden rounded-md border bg-muted">
						<img
							src={item.url}
							alt={item.key}
							className="h-full w-full object-cover"
						/>
					</div>

					<div className="flex gap-2">
						<Input
							value={item.url}
							readOnly
							onClick={(event) => {
								event.currentTarget.select();
							}}
						/>

						<Button
							type="button"
							size="icon"
							variant={"ghost"}
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
			))}
		</div>
	);
};
