import { os } from "@orpc/server";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import * as z from "zod";
import { db } from "#/db/index.ts";
import { AdUser } from "#/db/schema.ts";

const AdUserInsertSchema = createInsertSchema(AdUser).omit({
	id: true,
});
export const addAdUser = os
	.input(AdUserInsertSchema)
	.handler(async ({ input }) => {
		return await db.insert(AdUser).values(input).returning();
	});

export const listAdUsers = os.input(z.object({})).handler(async () => {
	return await db.select().from(AdUser);
});

export const deleteAdUser = os
	.input(
		z.object({
			id: z.number(),
		}),
	)
	.handler(async ({ input }) => {
		await db.delete(AdUser).where(eq(AdUser.id, input.id));
	});

export const getAdUser = os
	.input(
		z.object({
			id: z.number(),
		}),
	)
	.handler(async ({ input }) => {
		return await db.query.AdUser.findFirst({
			where: eq(AdUser.id, input.id),
		});
	});
