import { os } from "@orpc/server";
import { asc, eq } from "drizzle-orm";
import { createUpdateSchema } from "drizzle-zod";
import * as z from "zod";
import { db } from "#/db/index";
import { AdPage } from "#/db/schema";

export const adpageAdd = os.input(z.object({})).handler(async () => {
	return await db.insert(AdPage).values({}).returning();
});

export const adpageList = os.input(z.object({})).handler(async () => {
	return await db.select().from(AdPage).orderBy(asc(AdPage.createdAt));
});

export const adpageGet = os
	.input(z.object({ id: z.number().int() }))
	.handler(async ({ input }) => {
		const res = await db.select().from(AdPage).where(eq(AdPage.id, input.id));
		if (res) return res[0];
	});

export const adpageDelete = os
	.input(z.object({ id: z.number().int() }))
	.handler(async ({ input }) => {
		return await db.delete(AdPage).where(eq(AdPage.id, input.id)).returning();
	});

const adpageInsertSchema = createUpdateSchema(AdPage).partial().extend({
	id: z.number().int(),
});
export const adpageUpdate = os
	.input(adpageInsertSchema)
	.handler(async ({ input }) => {
		const { id, ...data } = input;

		return await db
			.update(AdPage)
			.set(data)
			.where(eq(AdPage.id, id))
			.returning();
	});
