import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

import { Input } from "#/components/ui/input";

import { compressImage } from "#/lib/compress-image";
import { getUploadUrl } from "#/lib/r2";

import { orpc } from "#/orpc/client";

export function ImageUpload() {
	const [isUploading, setIsUploading] = useState(false);

	const [uploadedCount, setUploadedCount] = useState(0);
	const [totalCount, setTotalCount] = useState(0);

	const qc = useQueryClient();

	// 单张上传
	const uploadImage = useCallback(async (file: File) => {
		const compressedFile = await compressImage(file);

		const filename = `${crypto.randomUUID()}.webp`;

		const { uploadUrl, fileUrl } = await getUploadUrl({
			data: {
				filename,
				contentType: "image/webp",
			},
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
	}, []);

	// 刷新列表
	const refreshImages = useCallback(async () => {
		await qc.invalidateQueries(
			orpc.imagesRouter.list.queryOptions({
				input: { page: 1 },
			}),
		);
	}, [qc]);

	// 批量上传
	const handleFilesUpload = useCallback(
		async (files: File[]) => {
			if (!files.length) return;

			try {
				setIsUploading(true);

				setUploadedCount(0);
				setTotalCount(files.length);

				await Promise.all(
					files.map(async (file) => {
						await uploadImage(file);

						setUploadedCount((prev) => prev + 1);
					}),
				);

				await refreshImages();
			} finally {
				setIsUploading(false);
			}
		},
		[uploadImage, refreshImages],
	);

	// 文件选择
	const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || []);

		if (!files.length) return;

		await handleFilesUpload(files);

		// 允许重复选择同一个文件
		event.target.value = "";
	};

	// Ctrl + V 粘贴批量上传
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

			await handleFilesUpload(files);
		};

		window.addEventListener("paste", handlePaste);

		return () => {
			window.removeEventListener("paste", handlePaste);
		};
	}, [handleFilesUpload]);

	return (
		<div className="flex flex-col items-start gap-4">
			<Input
				type="file"
				accept="image/*"
				multiple
				onChange={handleUpload}
				disabled={isUploading}
			/>

			<p className="text-sm text-muted-foreground">
				{isUploading
					? `上传中 ${uploadedCount} / ${totalCount}`
					: "支持批量上传 / Ctrl + V 粘贴上传"}
			</p>
		</div>
	);
}
