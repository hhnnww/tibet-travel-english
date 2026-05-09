import { os } from "@orpc/server";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { db } from "#/db";
import { adSaler } from "#/db/schema";

// update
const updateadSalerSchema = createInsertSchema(adSaler)
	.partial()
	.extend({ id: z.number() });

export const adSalerRoute = {
	// new
	new: os.handler(async () => {
		const result = await db.insert(adSaler).values({}).returning();
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
				.from(adSaler)
				.where(eq(adSaler.id, input.id))
				.limit(1);

			return item[0] ?? null;
		}),

	// list
	list: os.handler(async () => {
		return await db.select().from(adSaler).orderBy(adSaler.createdAt);
	}),

	// update
	update: os.input(updateadSalerSchema).handler(async ({ input }) => {
		await db.update(adSaler).set(input).where(eq(adSaler.id, input.id));
		const item = await db
			.select()
			.from(adSaler)
			.where(eq(adSaler.id, input.id))
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
			await db.delete(adSaler).where(eq(adSaler.id, input.id));

			return {
				success: true,
			};
		}),
};
