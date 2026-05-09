import { relations, sql } from "drizzle-orm";
import {
	boolean,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import adderess from "#/db/address.json";
import nicknames from "#/db/nikename.json";

export const AdPage = pgTable("adpage", {
	id: serial().primaryKey(),

	// 内容
	title: text().notNull().default("new tibet ad page"),
	content: text().notNull().default("new adpage content"),
	view: integer().default(sql`floor(random() * 1551 + 1550)::int`),

	// 用户
	nikename: text().$defaultFn(() => {
		return nicknames[Math.floor(Math.random() * nicknames.length)];
	}),
	address: text().$defaultFn(() => {
		return adderess[Math.floor(Math.random() * adderess.length)];
	}),
	star: integer().default(sql`floor(random() * 3 + 3)::int`),
	contributions: integer().default(sql`floor(random() * 151 + 150)::int`),
	avatar: text(),
	publishDate: integer().default(sql`floor(random() * 10 + 20)::int`),

	createdAt: timestamp("created_at").defaultNow(),
});

export const AdReply = pgTable("adreply", {
	id: serial().primaryKey(),

	// 内容
	content: text().notNull().default("new adreply content"),
	view: integer().default(sql`floor(random() * 1551 + 1550)::int`),

	// 用户
	nikename: text().$defaultFn(() => {
		return nicknames[Math.floor(Math.random() * nicknames.length)];
	}),
	address: text().$defaultFn(() => {
		return adderess[Math.floor(Math.random() * adderess.length)];
	}),
	star: integer().default(sql`floor(random() * 4 + 2)::int`),
	contributions: integer().default(sql`floor(random() * 151 + 150)::int`),
	avatar: text(),
	publishDate: integer().default(sql`floor(random() * 10 + 20)::int`),

	createdAt: timestamp("created_at").defaultNow(),

	pageId: integer("page_id")
		.notNull()
		.references(() => AdPage.id, {
			onDelete: "cascade",
		}),
});

export const adPageRelations = relations(AdPage, ({ many }) => ({
	replies: many(AdReply),
}));

export const adReplyRelations = relations(AdReply, ({ one }) => ({
	page: one(AdPage, {
		fields: [AdReply.pageId],
		references: [AdPage.id],
	}),
}));

export const adSaler = pgTable("adSaler", {
	id: serial().primaryKey(),

	name: text().default(""),
	wechat: text().default(""),
	phone: text().default(""),
	email: text().default(""),
	whatapp: text().default(""),

	state: boolean().default(true),
	createdAt: timestamp("created_at").defaultNow(),
});
