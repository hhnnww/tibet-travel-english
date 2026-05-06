import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const AdUser = pgTable("adusers", {
	id: serial().primaryKey(),
	nikename: text().notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	star: integer("star").default(5),
	address: text().notNull(),
});

export const Adpages = pgTable("adpages", {
	id: serial().primaryKey(),
	title: text().notNull().default(""),
	content: text().notNull().default(""),
	createdAt: timestamp("created_at").defaultNow(),

	userId: integer("user_id").references(() => AdUser.id),
});

export const AdReplay = pgTable("adreplay", {
	id: serial().primaryKey(),
	title: text().notNull().default(""),
	content: text().notNull().default(""),
	publishDate: timestamp("publish_date").defaultNow(),
	createdAt: timestamp("created_at").defaultNow(),

	userId: integer("user_id").references(() => AdUser.id),
	pageId: integer("page_id")
		.notNull()
		.references(() => Adpages.id),
});

export const AdComment = pgTable("adcomment", {
	id: serial().primaryKey(),
	content: text().notNull().default(""),
	publishDate: timestamp("publish_date").defaultNow(),
	createdAt: timestamp("created_at").defaultNow(),

	userId: integer("user_id").references(() => AdUser.id),
	replayId: integer("replay_id")
		.notNull()
		.references(() => AdReplay.id),
});
