CREATE TABLE "adpage" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text DEFAULT 'new tibet ad page' NOT NULL,
	"content" text DEFAULT 'new adpage content' NOT NULL,
	"view" integer DEFAULT floor(random() * 1551 + 1550)::int,
	"nikename" text,
	"address" text,
	"star" integer DEFAULT floor(random() * 4 + 2)::int,
	"contributions" integer DEFAULT floor(random() * 151 + 150)::int,
	"avatar" text,
	"publishDate" integer DEFAULT floor(random() * 10 + 20)::int,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "adreply" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text DEFAULT 'new adreply content' NOT NULL,
	"view" integer DEFAULT floor(random() * 1551 + 1550)::int,
	"nikename" text,
	"address" text,
	"star" integer DEFAULT floor(random() * 4 + 2)::int,
	"contributions" integer DEFAULT floor(random() * 151 + 150)::int,
	"avatar" text,
	"publishDate" integer DEFAULT floor(random() * 10 + 20)::int,
	"created_at" timestamp DEFAULT now(),
	"page_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "adreply" ADD CONSTRAINT "adreply_page_id_adpage_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."adpage"("id") ON DELETE cascade ON UPDATE no action;