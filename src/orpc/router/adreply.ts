import { os } from "@orpc/server";
import { asc, eq } from "drizzle-orm";
import { createUpdateSchema } from "drizzle-zod";
import * as z from "zod";
import { db } from "#/db/index";
import { AdReply } from "#/db/schema";

export const adreplyAdd = os
	.input(z.object({ pageid: z.number().int() }))
	.handler(async ({ input }) => {
		return await db
			.insert(AdReply)
			.values({
				pageId: input.pageid,
			})
			.returning();
	});

export const adreplyList = os
	.input(z.object({ pageid: z.number().int() }))
	.handler(async ({ input }) => {
		return await db
			.select()
			.from(AdReply)
			.where(eq(AdReply.pageId, input.pageid))
			.orderBy(asc(AdReply.createdAt));
	});

export const adreplyGet = os
	.input(z.object({ id: z.number().int() }))
	.handler(async ({ input }) => {
		const res = await db.select().from(AdReply).where(eq(AdReply.id, input.id));
		if (res) return res[0];
	});

export const adreplyDelete = os
	.input(z.object({ id: z.number().int() }))
	.handler(async ({ input }) => {
		return await db.delete(AdReply).where(eq(AdReply.id, input.id)).returning();
	});

const adreplyInsertSchema = createUpdateSchema(AdReply).partial().extend({
	id: z.number().int(),
});
export const adreplyUpdate = os
	.input(adreplyInsertSchema)
	.handler(async ({ input }) => {
		const { id, ...data } = input;

		return await db
			.update(AdReply)
			.set(data)
			.where(eq(AdReply.id, id))
			.returning();
	});
