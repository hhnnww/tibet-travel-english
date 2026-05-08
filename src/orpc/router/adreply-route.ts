import { os } from "@orpc/server";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { db } from "#/db";
import { AdReply } from "#/db/schema";

// update
const updateAdReplySchema = createInsertSchema(AdReply)
	.partial()
	.extend({ id: z.number() });

export const AdReplyRoute = {
	// new
	new: os.input(z.object({ pageId: z.number() })).handler(async (ctx) => {
		const result = await db
			.insert(AdReply)
			.values({ pageId: ctx.input.pageId })
			.returning();
		return result[0];
	}),

	// get
	get: os
		.input(
			z.object({
				id: z.number(),
			}),
		)
		.handler(async ({ input }) => {
			const item = await db
				.select()
				.from(AdReply)
				.where(eq(AdReply.id, input.id))
				.limit(1);

			return item[0] ?? null;
		}),

	// list
	list: os.input(z.object({ pageId: z.number() })).handler(async (ctx) => {
		return await db
			.select()
			.from(AdReply)
			.where(eq(AdReply.pageId, ctx.input.pageId))
			.orderBy(AdReply.createdAt);
	}),

	// update
	update: os.input(updateAdReplySchema).handler(async ({ input }) => {
		await db.update(AdReply).set(input).where(eq(AdReply.id, input.id));
		const item = await db
			.select()
			.from(AdReply)
			.where(eq(AdReply.id, input.id))
			.limit(1);

		return item[0] ?? null;
	}),

	// delete
	delete: os
		.input(
			z.object({
				id: z.number(),
			}),
		)
		.handler(async ({ input }) => {
			await db.delete(AdReply).where(eq(AdReply.id, input.id));

			return {
				success: true,
			};
		}),
};
