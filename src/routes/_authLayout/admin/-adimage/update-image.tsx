import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImagePlus } from "lucide-react";
import {
	type ChangeEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

import { Button } from "#/components/ui/button";
import { Progress } from "#/components/ui/progress";

import { compressImage } from "#/lib/compress-image";

import { orpc } from "#/orpc/client";

export function ImageUpload() {
	const qc = useQueryClient();

	const inputRef = useRef<HTMLInputElement>(null);

	const [uploadedCount, setUploadedCount] = useState(0);
	const [totalCount, setTotalCount] = useState(0);

	const progress = totalCount > 0 ? (uploadedCount / totalCount) * 100 : 0;

	// 单张上传
	const uploadMutation = useMutation({
		mutationFn: async (file: File) => {
			const compressedFile = await compressImage(file);

			const filename = `${crypto.randomUUID()}.webp`;

			const { uploadUrl, fileUrl } =
				await orpc.imagesRouter.get_upload_url.call({
					filename,
					contentType: "image/webp",
				});

			const res = await fetch(uploadUrl, {
				method: "PUT",
				headers: {
					"Content-Type": "image/webp",
				},
				body: compressedFile,
			});

			if (!res.ok) {
				throw new Error(await res.text());
			}

			return fileUrl;
		},
	});

	// 批量上传
	const batchUploadMutation = useMutation({
		mutationFn: async (files: File[]) => {
			setUploadedCount(0);
			setTotalCount(files.length);

			const results = await Promise.all(
				files.map(async (file) => {
					const result = await uploadMutation.mutateAsync(file);

					setUploadedCount((prev) => prev + 1);

					return result;
				}),
			);

			return results;
		},

		onSuccess: async () => {
			await qc.invalidateQueries(
				orpc.imagesRouter.list.queryOptions({
					input: { page: 1 },
				}),
			);
		},

		onSettled: () => {
			setTimeout(() => {
				setUploadedCount(0);
				setTotalCount(0);
			}, 600);
		},
	});

	// 打开文件选择
	const openFilePicker = () => {
		inputRef.current?.click();
	};

	// 文件上传
	const handleUpload = useCallback(
		async (event: ChangeEvent<HTMLInputElement>) => {
			const files = Array.from(event.target.files || []);

			if (!files.length) return;

			await batchUploadMutation.mutateAsync(files);

			event.target.value = "";
		},
		[batchUploadMutation],
	);

	// Ctrl + V 粘贴上传
	useEffect(() => {
		const handlePaste = async (event: ClipboardEvent) => {
			const items = event.clipboardData?.items;

			if (!items) return;

			const files: File[] = [];

			for (const item of items) {
				if (item.type.startsWith("image/")) {
					const file = item.getAsFile();

					if (file) {
						files.push(file);
					}
				}
			}

			if (!files.length) return;

			event.preventDefault();

			await batchUploadMutation.mutateAsync(files);
		};

		window.addEventListener("paste", handlePaste);

		return () => {
			window.removeEventListener("paste", handlePaste);
		};
	}, [batchUploadMutation]);

	return (
		<div className="flex w-full flex-col gap-3 items-start">
			<input
				ref={inputRef}
				type="file"
				accept="image/*"
				multiple
				className="hidden"
				onChange={handleUpload}
			/>

			<Button
				type="button"
				onClick={openFilePicker}
				disabled={batchUploadMutation.isPending}
				className="gap-2"
			>
				<ImagePlus className="size-4" />

				{batchUploadMutation.isPending ? "上传中..." : "上传图片"}
			</Button>

			{batchUploadMutation.isPending && (
				<div className="space-y-2 w-full">
					<Progress value={progress} />

					<div className="text-muted-foreground text-xs">
						{uploadedCount} / {totalCount}
					</div>
				</div>
			)}
		</div>
	);
}
