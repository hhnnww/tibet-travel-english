import { os } from "@orpc/server";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { db } from "#/db";
import { AdPage } from "#/db/schema";

// update
const updateAdPageSchema = createInsertSchema(AdPage)
	.partial()
	.extend({ id: z.number() });

export const adpageRoute = {
	// new
	new: os.input(z.object()).handler(async () => {
		const result = await db.insert(AdPage).values({}).returning();
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
				.from(AdPage)
				.where(eq(AdPage.id, input.id))
				.limit(1);

			return item[0] ?? null;
		}),

	// list
	list: os.input(z.object({})).handler(async () => {
		return await db.select().from(AdPage).orderBy(AdPage.createdAt);
	}),

	// update
	update: os.input(updateAdPageSchema).handler(async ({ input }) => {
		await db.update(AdPage).set(input).where(eq(AdPage.id, input.id));
		const item = await db
			.select()
			.from(AdPage)
			.where(eq(AdPage.id, input.id))
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
			await db.delete(AdPage).where(eq(AdPage.id, input.id));

			return {
				success: true,
			};
		}),
};
