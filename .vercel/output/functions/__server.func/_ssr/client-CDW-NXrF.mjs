import { _ as object, g as number, l as zod_default, y as string } from "../_libs/@neondatabase/auth-ui+[...].mjs";
import { i as getServerFnById, n as createServerFn, r as getRequestHeaders, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { d as os, u as createRouterClient } from "../_libs/@orpc/json-schema+[...].mjs";
import { n as ListObjectsV2Command, r as S3Client, t as PutObjectCommand } from "../_libs/@aws-sdk/client-s3+[...].mjs";
import { t as getSignedUrl } from "../_libs/@aws-sdk/s3-request-presigner+[...].mjs";
import { t as nanoid } from "../_libs/nanoid.mjs";
import { a as timestamp, c as integer, i as pgTable, l as boolean, m as sql, n as relations, o as text, r as eq, s as serial, t as drizzle } from "../_libs/drizzle-orm.mjs";
import { t as createInsertSchema } from "../_libs/drizzle-zod.mjs";
import { t as createRouterUtils } from "../_libs/@orpc/tanstack-query+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-CDW-NXrF.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var r2 = new S3Client({
	region: "auto",
	endpoint: "https://6631e42f289efcec90f7973c87737e46.r2.cloudflarestorage.com",
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID,
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
	}
});
createServerFn({ method: "POST" }).inputValidator((data) => data).handler(createSsrRpc("6d799c5f4b5240f9fa983273fe56a959806d5b544878fe98170cd472a1450aba"));
var deleteImage = createServerFn({ method: "POST" }).inputValidator(zod_default.object({ key: zod_default.string() })).handler(createSsrRpc("3880728b1b0dd3e82633e1fefa78ab1d479d945d6351c9cad688d17d9db627c6"));
var imagesRouter = {
	delete: os.input(object({ key: string() })).handler(async (ctx) => {
		return await deleteImage({ data: { key: ctx.input.key } });
	}),
	list: os.input(object({
		page: number().int().min(1).default(1),
		limit: number().int().min(1).max(100).default(20)
	})).handler(async ({ input }) => {
		const allItems = [];
		let continuationToken;
		do {
			const result = await r2.send(new ListObjectsV2Command({
				Bucket: process.env.R2_BUCKET,
				Prefix: "uploads/",
				MaxKeys: 1e3,
				ContinuationToken: continuationToken
			}));
			if (result.Contents) allItems.push(...result.Contents);
			continuationToken = result.NextContinuationToken;
		} while (continuationToken);
		const baseUrl = process.env.R2_PUBLIC_URL.replace(/\/$/, "");
		const sorted = allItems.sort((a, b) => (b.Key ?? "").localeCompare(a.Key ?? ""));
		const start = (input.page - 1) * input.limit;
		const end = start + input.limit;
		return {
			items: sorted.slice(start, end).map((item) => ({
				key: item.Key,
				url: `${baseUrl}/${item.Key}`,
				size: item.Size,
				lastModified: item.LastModified
			})),
			page: input.page,
			pageSize: input.limit,
			total: sorted.length,
			hasMore: end < sorted.length
		};
	}),
	get_upload_url: os.input(object({
		filename: string(),
		contentType: string()
	})).handler(async (ctx) => {
		if (![
			"image/png",
			"image/jpeg",
			"image/webp",
			"image/gif"
		].includes(ctx.input.contentType)) throw new Error("Invalid file type");
		const key = `uploads/${Date.now()}-${nanoid()}.webp`;
		return {
			uploadUrl: await getSignedUrl(r2, new PutObjectCommand({
				Bucket: process.env.R2_BUCKET,
				Key: key,
				ContentType: ctx.input.contentType,
				CacheControl: "public, max-age=31536000"
			}), { expiresIn: 300 }),
			fileUrl: `${process.env.R2_PUBLIC_URL}/${key}`
		};
	})
};
var address_default = [
	"New York, USA",
	"Los Angeles, USA",
	"San Francisco, USA",
	"Chicago, USA",
	"Toronto, Canada",
	"Vancouver, Canada",
	"Montreal, Canada",
	"London, United Kingdom",
	"Manchester, United Kingdom",
	"Birmingham, United Kingdom",
	"Paris, France",
	"Lyon, France",
	"Marseille, France",
	"Berlin, Germany",
	"Munich, Germany",
	"Hamburg, Germany",
	"Rome, Italy",
	"Milan, Italy",
	"Naples, Italy",
	"Madrid, Spain",
	"Barcelona, Spain",
	"Valencia, Spain",
	"Amsterdam, Netherlands",
	"Rotterdam, Netherlands",
	"The Hague, Netherlands",
	"Brussels, Belgium",
	"Antwerp, Belgium",
	"Ghent, Belgium",
	"Zurich, Switzerland",
	"Geneva, Switzerland",
	"Basel, Switzerland",
	"Vienna, Austria",
	"Salzburg, Austria",
	"Innsbruck, Austria",
	"Stockholm, Sweden",
	"Gothenburg, Sweden",
	"Malmo, Sweden",
	"Oslo, Norway",
	"Bergen, Norway",
	"Trondheim, Norway",
	"Copenhagen, Denmark",
	"Aarhus, Denmark",
	"Odense, Denmark",
	"Helsinki, Finland",
	"Espoo, Finland",
	"Tampere, Finland",
	"Dublin, Ireland",
	"Cork, Ireland",
	"Galway, Ireland",
	"Lisbon, Portugal",
	"Porto, Portugal",
	"Braga, Portugal",
	"Prague, Czech Republic",
	"Brno, Czech Republic",
	"Ostrava, Czech Republic",
	"Warsaw, Poland",
	"Krakow, Poland",
	"Gdansk, Poland",
	"Budapest, Hungary",
	"Debrecen, Hungary",
	"Szeged, Hungary",
	"Athens, Greece",
	"Thessaloniki, Greece",
	"Patras, Greece",
	"Tokyo, Japan",
	"Osaka, Japan",
	"Kyoto, Japan",
	"Yokohama, Japan",
	"Nagoya, Japan",
	"Seoul, South Korea",
	"Busan, South Korea",
	"Incheon, South Korea",
	"Singapore",
	"Sydney, Australia",
	"Melbourne, Australia",
	"Brisbane, Australia",
	"Perth, Australia",
	"Auckland, New Zealand",
	"Wellington, New Zealand",
	"Christchurch, New Zealand",
	"Luxembourg City, Luxembourg",
	"Reykjavik, Iceland",
	"Tel Aviv, Israel",
	"Jerusalem, Israel",
	"Haifa, Israel"
];
var nikename_default = [
	"ShadowFox",
	"LunaStar",
	"CyberWolf",
	"PixelDream",
	"SilentRiver",
	"NovaSky",
	"GoldenLeaf",
	"BlueEcho",
	"NightFlame",
	"CrystalRain",
	"IronTiger",
	"SnowWalker",
	"DarkComet",
	"SilverMoon",
	"ThunderBear",
	"FrozenWind",
	"FireFalcon",
	"MistyCloud",
	"RapidStorm",
	"GhostHunter",
	"VelvetSky",
	"TinyDragon",
	"WildPhoenix",
	"OceanWhisper",
	"BrightShadow",
	"MoonWhale",
	"SolarKnight",
	"EchoBlade",
	"SilentNova",
	"DreamWalker",
	"StormChaser",
	"IcePhoenix",
	"WolfSpirit",
	"SkyRunner",
	"CloudDancer",
	"GoldenTiger",
	"DarkKnight",
	"SilverArrow",
	"MagicFox",
	"RapidThunder",
	"BlueDragon",
	"NightWalker",
	"CrystalFox",
	"FrozenTiger",
	"FireShadow",
	"OceanBlade",
	"TinyStorm",
	"WildMoon",
	"CyberFalcon",
	"NovaDream",
	"LunarEcho",
	"ThunderWolf",
	"SilentBlade",
	"ShadowPhoenix",
	"GoldenStorm",
	"SilverCloud",
	"RapidFox",
	"DarkRiver",
	"MagicRain",
	"SnowDragon",
	"IronShadow",
	"OceanTiger",
	"VelvetMoon",
	"BrightFalcon",
	"GhostNova",
	"DreamCloud",
	"SkyWhisper",
	"MoonStorm",
	"CrystalKnight",
	"BlueRiver",
	"NightDragon",
	"FireWolf",
	"FrozenBlade",
	"WildFox",
	"TinyMoon",
	"CyberStorm",
	"NovaPhoenix",
	"SilentTiger",
	"GoldenDream",
	"DarkEcho",
	"SilverFlame",
	"RapidMoon",
	"OceanShadow",
	"MagicTiger",
	"SnowFalcon",
	"IronDream",
	"VelvetBlade",
	"BrightWolf",
	"GhostCloud",
	"DreamStorm",
	"SkyTiger",
	"MoonEcho",
	"CrystalShadow",
	"BluePhoenix",
	"NightFalcon",
	"FireDream",
	"FrozenMoon",
	"WildStorm",
	"CyberTiger"
];
var schema_exports = /* @__PURE__ */ __exportAll({
	AdPage: () => AdPage,
	AdReply: () => AdReply,
	adPageRelations: () => adPageRelations,
	adReplyRelations: () => adReplyRelations,
	adSaler: () => adSaler
});
var AdPage = pgTable("adpage", {
	id: serial().primaryKey(),
	title: text().notNull().default("new tibet ad page"),
	content: text().notNull().default("new adpage content"),
	view: integer().default(sql`floor(random() * 1551 + 1550)::int`),
	nikename: text().$defaultFn(() => {
		return nikename_default[Math.floor(Math.random() * nikename_default.length)];
	}),
	address: text().$defaultFn(() => {
		return address_default[Math.floor(Math.random() * address_default.length)];
	}),
	star: integer().default(sql`floor(random() * 3 + 3)::int`),
	contributions: integer().default(sql`floor(random() * 151 + 150)::int`),
	avatar: text(),
	publishDate: integer().default(sql`floor(random() * 10 + 20)::int`),
	createdAt: timestamp("created_at").defaultNow()
});
var AdReply = pgTable("adreply", {
	id: serial().primaryKey(),
	content: text().notNull().default("new adreply content"),
	view: integer().default(sql`floor(random() * 1551 + 1550)::int`),
	nikename: text().$defaultFn(() => {
		return nikename_default[Math.floor(Math.random() * nikename_default.length)];
	}),
	address: text().$defaultFn(() => {
		return address_default[Math.floor(Math.random() * address_default.length)];
	}),
	star: integer().default(sql`floor(random() * 4 + 2)::int`),
	contributions: integer().default(sql`floor(random() * 151 + 150)::int`),
	avatar: text(),
	publishDate: integer().default(sql`floor(random() * 10 + 20)::int`),
	createdAt: timestamp("created_at").defaultNow(),
	pageId: integer("page_id").notNull().references(() => AdPage.id, { onDelete: "cascade" })
});
var adPageRelations = relations(AdPage, ({ many }) => ({ replies: many(AdReply) }));
var adReplyRelations = relations(AdReply, ({ one }) => ({ page: one(AdPage, {
	fields: [AdReply.pageId],
	references: [AdPage.id]
}) }));
var adSaler = pgTable("adSaler", {
	id: serial().primaryKey(),
	avatar: text().default(""),
	name: text().default(""),
	wechat: text().default(""),
	phone: text().default(""),
	email: text().default(""),
	whatapp: text().default(""),
	wechat_erweima: text().default(""),
	whatapp_erweima: text().default(""),
	state: boolean().default(true),
	createdAt: timestamp("created_at").defaultNow()
});
var db = drizzle(process.env.DATABASE_URL, { schema: schema_exports });
var adpageWithReplyRoute = { get: os.input(zod_default.object({ pageid: zod_default.number().int() })).handler(async ({ input }) => {
	return await db.query.AdPage.findFirst({
		where: eq(AdPage.id, input.pageid),
		with: { replies: { orderBy: (replies, { asc }) => [asc(replies.createdAt)] } }
	});
}) };
var updateAdPageSchema = createInsertSchema(AdPage).partial().extend({ id: number() });
var adpageRoute = {
	new: os.input(object()).handler(async () => {
		return (await db.insert(AdPage).values({}).returning())[0];
	}),
	get: os.input(object({ id: number() })).handler(async ({ input }) => {
		return (await db.select().from(AdPage).where(eq(AdPage.id, input.id)).limit(1))[0] ?? null;
	}),
	list: os.input(object({})).handler(async () => {
		return await db.select().from(AdPage).orderBy(AdPage.createdAt);
	}),
	update: os.input(updateAdPageSchema).handler(async ({ input }) => {
		await db.update(AdPage).set(input).where(eq(AdPage.id, input.id));
		return (await db.select().from(AdPage).where(eq(AdPage.id, input.id)).limit(1))[0] ?? null;
	}),
	delete: os.input(object({ id: number() })).handler(async ({ input }) => {
		await db.delete(AdPage).where(eq(AdPage.id, input.id));
		return { success: true };
	})
};
var updateAdReplySchema = createInsertSchema(AdReply).partial().extend({ id: number() });
var AdReplyRoute = {
	new: os.input(object({ pageId: number() })).handler(async (ctx) => {
		return (await db.insert(AdReply).values({ pageId: ctx.input.pageId }).returning())[0];
	}),
	get: os.input(object({ id: number() })).handler(async ({ input }) => {
		return (await db.select().from(AdReply).where(eq(AdReply.id, input.id)).limit(1))[0] ?? null;
	}),
	list: os.input(object({ pageId: number() })).handler(async (ctx) => {
		return await db.select().from(AdReply).where(eq(AdReply.pageId, ctx.input.pageId)).orderBy(AdReply.createdAt);
	}),
	update: os.input(updateAdReplySchema).handler(async ({ input }) => {
		await db.update(AdReply).set(input).where(eq(AdReply.id, input.id));
		return (await db.select().from(AdReply).where(eq(AdReply.id, input.id)).limit(1))[0] ?? null;
	}),
	delete: os.input(object({ id: number() })).handler(async ({ input }) => {
		await db.delete(AdReply).where(eq(AdReply.id, input.id));
		return { success: true };
	})
};
var updateadSalerSchema = createInsertSchema(adSaler).partial().extend({ id: number() });
var router_default = {
	imagesRouter,
	adpageRoute,
	AdReplyRoute,
	adSalerRoute: {
		new: os.handler(async () => {
			return (await db.insert(adSaler).values({}).returning())[0];
		}),
		get: os.input(object({ id: number() })).handler(async ({ input }) => {
			return (await db.select().from(adSaler).where(eq(adSaler.id, input.id)).limit(1))[0] ?? null;
		}),
		list: os.handler(async () => {
			return await db.select().from(adSaler).orderBy(adSaler.createdAt);
		}),
		update: os.input(updateadSalerSchema).handler(async ({ input }) => {
			await db.update(adSaler).set(input).where(eq(adSaler.id, input.id));
			return (await db.select().from(adSaler).where(eq(adSaler.id, input.id)).limit(1))[0] ?? null;
		}),
		delete: os.input(object({ id: number() })).handler(async ({ input }) => {
			await db.delete(adSaler).where(eq(adSaler.id, input.id));
			return { success: true };
		}),
		current_saler: os.handler(async () => {
			const salers = await db.select().from(adSaler).where(eq(adSaler.state, true)).orderBy(adSaler.createdAt);
			if (salers.length === 0) return null;
			const now = /* @__PURE__ */ new Date();
			const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
			return salers[Math.floor((now.getTime() - startOfDay) / (1e3 * 60 * 60)) % salers.length];
		})
	},
	adpageWithReplyRoute
};
var getORPCClient = () => createRouterClient(router_default, { context: () => ({ headers: getRequestHeaders() }) });
var orpc = createRouterUtils(getORPCClient());
//#endregion
export { router_default as n, orpc as t };
