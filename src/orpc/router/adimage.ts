import {
	ListObjectsV2Command,
	type ListObjectsV2CommandOutput,
} from "@aws-sdk/client-s3";

import { os } from "@orpc/server";

import * as z from "zod";

import { r2 } from "#/lib/r2";

export const imagesRouter = {
	list: os
		.input(
			z.object({
				page: z.number().int().default(1),
			}),
		)
		.handler(async ({ input }) => {
			const page = input.page;
			const limit = 30;
			let continuationToken: string | undefined;
			let currentPage = 1;
			let result: ListObjectsV2CommandOutput | undefined;

			while (currentPage <= page) {
				result = await r2.send(
					new ListObjectsV2Command({
						Bucket: process.env.R2_BUCKET as string,
						Prefix: "uploads/",
						MaxKeys: limit,
						ContinuationToken: continuationToken,
					}),
				);
				continuationToken = result.NextContinuationToken;
				if (currentPage === page) {
					break;
				}
				if (!continuationToken) {
					break;
				}
				currentPage++;
			}
			const baseUrl = (process.env.R2_PUBLIC_URL as string).replace(/\/$/, "");
			const images =
				result?.Contents?.sort((a, b) => {
					const aTime = a.LastModified?.getTime() ?? 0;
					const bTime = b.LastModified?.getTime() ?? 0;
					return bTime - aTime;
				}).map((item) => ({
					key: item.Key,
					url: `${baseUrl}/${item.Key}`,
					size: item.Size,
					lastModified: item.LastModified,
				})) ?? [];

			return {
				items: images,
				page,
				pageSize: limit,
				hasMore: Boolean(result?.NextContinuationToken),
				nextCursor: result?.NextContinuationToken ?? null,
			};
		}),
};
