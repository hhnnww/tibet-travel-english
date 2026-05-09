import { os } from "@orpc/server";
import { eq } from "drizzle-orm";
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
					replies: true,
				},
			});
		}),
};
