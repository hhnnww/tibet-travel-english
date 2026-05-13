import {
	ListObjectsV2Command,
	type ListObjectsV2CommandOutput,
	PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { os } from "@orpc/server";
import { nanoid } from "nanoid";
import * as z from "zod";
import { deleteImage, r2 } from "#/lib/r2";

export const imagesRouter = {
	// 删除图片
	delete: os
		.input(
			z.object({
				key: z.string(),
			}),
		)
		.handler(async (ctx) => {
			return await deleteImage({
				data: {
					key: ctx.input.key,
				},
			});
		}),

	list: os
		.input(
			z.object({
				page: z.number().int().min(1).default(1),
				limit: z.number().int().min(1).max(100).default(20),
			}),
		)
		.handler(async ({ input }) => {
			const allItems: NonNullable<ListObjectsV2CommandOutput["Contents"]> = [];
			let continuationToken: string | undefined;
			// 拉取全部对象
			do {
				const result: ListObjectsV2CommandOutput = await r2.send(
					new ListObjectsV2Command({
						Bucket: process.env.R2_BUCKET as string,
						Prefix: "uploads/",
						MaxKeys: 1000,
						ContinuationToken: continuationToken,
					}),
				);
				if (result.Contents) {
					allItems.push(...result.Contents);
				}
				continuationToken = result.NextContinuationToken;
			} while (continuationToken);

			const baseUrl = (process.env.R2_PUBLIC_URL as string).replace(/\/$/, "");

			// key 自带 Date.now 时间戳
			// 倒序 = 最新图片在最前
			const sorted = allItems.sort((a, b) =>
				(b.Key ?? "").localeCompare(a.Key ?? ""),
			);

			// 前端分页
			const start = (input.page - 1) * input.limit;
			const end = start + input.limit;

			const items = sorted.slice(start, end).map((item) => ({
				key: item.Key,
				url: `${baseUrl}/${item.Key}`,
				size: item.Size,
				lastModified: item.LastModified,
			}));

			return {
				items,
				page: input.page,
				pageSize: input.limit,
				total: sorted.length,
				hasMore: end < sorted.length,
			};
		}),

	get_upload_url: os
		.input(z.object({ filename: z.string(), contentType: z.string() }))
		.handler(async (ctx) => {
			const allowedTypes = [
				"image/png",
				"image/jpeg",
				"image/webp",
				"image/gif",
			];
			if (!allowedTypes.includes(ctx.input.contentType)) {
				throw new Error("Invalid file type");
			}
			const key = `uploads/${Date.now()}-${nanoid()}.webp`;
			const command = new PutObjectCommand({
				Bucket: process.env.R2_BUCKET as string,
				Key: key,
				ContentType: ctx.input.contentType,
				CacheControl: "public, max-age=31536000",
			});

			const uploadUrl = await getSignedUrl(r2, command, {
				expiresIn: 60 * 5,
			});
			const fileUrl = `${process.env.R2_PUBLIC_URL}/${key}`;
			return {
				uploadUrl,
				fileUrl,
			};
		}),
};
