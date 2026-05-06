import { os } from "@orpc/server";
import { asc, eq } from "drizzle-orm";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import * as z from "zod";
import { db } from "#/db/index.ts";
import { AdReplay } from "#/db/schema.ts";

export const addAdReply = os
	.input(
		createInsertSchema(AdReplay).omit({
			id: true,
		}),
	)
	.handler(async ({ input }) => {
		const [row] = await db.insert(AdReplay).values(input).returning();
		return row;
	});

export const listAdReplys = os.input(z.object({})).handler(async () => {
	return await db.select().from(AdReplay).orderBy(asc(AdReplay.createdAt));
});

export const deleteAdReply = os
	.input(
		z.object({
			id: z.int(),
		}),
	)
	.handler(async ({ input }) => {
		await db.delete(AdReplay).where(eq(AdReplay.id, input.id));
	});

export const updateAdReply = os
	.input(createUpdateSchema(AdReplay))
	.handler(async ({ input }) => {
		if (input.id === undefined) {
			throw new Error("id is required for update");
		}

		const { id, ...data } = input;
		const [row] = await db
			.update(AdReplay)
			.set(data)
			.where(eq(AdReplay.id, id))
			.returning();
		return row;
	});
