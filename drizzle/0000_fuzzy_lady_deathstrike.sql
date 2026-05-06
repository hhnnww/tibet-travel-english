CREATE TABLE "adcomment" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"publish_date" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"user_id" integer NOT NULL,
	"replay_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "adreplay" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"publish_date" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"user_id" integer NOT NULL,
	"page_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "adusers" (
	"id" serial PRIMARY KEY NOT NULL,
	"nikename" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"star" integer DEFAULT 0,
	"address" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "adpages" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"user_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "adcomment" ADD CONSTRAINT "adcomment_user_id_adusers_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."adusers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "adcomment" ADD CONSTRAINT "adcomment_replay_id_adreplay_id_fk" FOREIGN KEY ("replay_id") REFERENCES "public"."adreplay"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "adreplay" ADD CONSTRAINT "adreplay_user_id_adusers_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."adusers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "adreplay" ADD CONSTRAINT "adreplay_page_id_adpages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."adpages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "adpages" ADD CONSTRAINT "adpages_user_id_adusers_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."adusers"("id") ON DELETE no action ON UPDATE no action;