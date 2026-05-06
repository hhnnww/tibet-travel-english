import { os } from "@orpc/server";
import { asc, eq } from "drizzle-orm";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import * as z from "zod";
import { db } from "#/db/index.ts";
import { Adpages } from "#/db/schema.ts";

export const getAdPage = os
	.input(
		z.object({
			id: z.int(),
		}),
	)
	.handler(async ({ input }) => {
		const [row] = await db
			.select()
			.from(Adpages)
			.where(eq(Adpages.id, input.id));
		return row;
	});

export const listAdPages = os.input(z.object({})).handler(async () => {
	return await db.select().from(Adpages).orderBy(asc(Adpages.createdAt));
});

export const addAdPage = os
	.input(createInsertSchema(Adpages).omit({ id: true }))
	.handler(async ({ input }) => {
		const [row] = await db.insert(Adpages).values(input).returning();
		return row;
	});

export const deleteAdPage = os
	.input(
		z.object({
			id: z.int(),
		}),
	)
	.handler(async ({ input }) => {
		await db.delete(Adpages).where(eq(Adpages.id, input.id));
	});

export const updateAdPage = os
	.input(createUpdateSchema(Adpages))
	.handler(async ({ input }) => {
		if (input.id === undefined) {
			throw new Error("id is required for update");
		}

		const { id, ...data } = input;
		const [row] = await db
			.update(Adpages)
			.set(data)
			.where(eq(Adpages.id, id))
			.returning();
		return row;
	});
