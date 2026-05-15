import { os } from "@orpc/server";
import { eq } from "drizzle-orm"; // 引入 desc 用于排序
import z from "zod";
import { db } from "#/db";
import { AdPage } from "#/db/schema";

export const adpageWithReplyRoute = {
	get: os
		.input(
			z.object({
				pageid: z.number().int(),
			}),
		)
		.handler(async ({ input }) => {
			return await db.query.AdPage.findFirst({
				where: eq(AdPage.id, input.pageid),
				with: {
					// 修改: 添加 orderBy 以按创建时间降序排列回复
					replies: {
						orderBy: (replies, { asc }) => [asc(replies.createdAt)],
					},
				},
			});
		}),
};
