import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

import { Input } from "#/components/ui/input";

import { compressImage } from "#/lib/compress-image";
import { getUploadUrl } from "#/lib/r2";

import { orpc } from "#/orpc/client";

export function ImageUpload() {
	const [isUploading, setIsUploading] = useState(false);
	const qc = useQueryClient();
	const uploadImage = useCallback(async (file: File) => {
		const compressedFile = await compressImage(file);
		const filename = `${crypto.randomUUID()}.webp`;
		const { uploadUrl, fileUrl } = await getUploadUrl({
			data: {
				filename,
				contentType: "image/webp",
			},
		});

		// 上传到 R2
		await fetch(uploadUrl, {
			method: "PUT",
			headers: {
				"Content-Type": "image/webp",
			},
			body: compressedFile,
		});

		return fileUrl;
	}, []);

	// 刷新图片列表
	const refreshImages = useCallback(async () => {
		await qc.invalidateQueries(
			orpc.imagesRouter.list.queryOptions({ input: { page: 1 } }),
		);
	}, [qc]);

	// 处理上传
	const handleFileUpload = useCallback(
		async (file: File) => {
			try {
				setIsUploading(true);

				const url = await uploadImage(file);

				if (url) {
					await refreshImages();
				}
			} finally {
				setIsUploading(false);
			}
		},
		[uploadImage, refreshImages],
	);

	// 文件选择上传
	const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;
		await handleFileUpload(file);
	};

	// Ctrl + V 粘贴上传
	useEffect(() => {
		const handlePaste = async (event: ClipboardEvent) => {
			const items = event.clipboardData?.items;
			if (!items) return;
			for (const item of items) {
				if (item.type.startsWith("image/")) {
					const file = item.getAsFile();
					if (!file) return;
					event.preventDefault();
					await handleFileUpload(file);
					break;
				}
			}
		};
		window.addEventListener("paste", handlePaste);
		return () => {
			window.removeEventListener("paste", handlePaste);
		};
	}, [handleFileUpload]);

	return (
		<div className="flex gap-4 flex-col items-start">
			<Input
				type="file"
				accept="image/*"
				onChange={handleUpload}
				disabled={isUploading}
			/>

			<p className="text-sm">
				{isUploading ? "上传中" : "可以直接粘贴上传图片"}
			</p>
		</div>
	);
}
