CREATE TABLE "adSaler" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text DEFAULT '',
	"wechat" text DEFAULT '',
	"phone" text DEFAULT '',
	"email" text DEFAULT '',
	"whatapp" text DEFAULT '',
	"state" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "adpage" ALTER COLUMN "star" SET DEFAULT floor(random() * 3 + 3)::int;