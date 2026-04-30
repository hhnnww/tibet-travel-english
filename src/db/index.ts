import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema.ts";

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
	throw new Error("DATABASE_URL environment variable is required");
}
export const db = drizzle(dbUrl, { schema });
