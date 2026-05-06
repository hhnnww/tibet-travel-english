ALTER TABLE "adcomment" ALTER COLUMN "content" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "adcomment" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "adreplay" ALTER COLUMN "title" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "adreplay" ALTER COLUMN "content" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "adreplay" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "adpages" ALTER COLUMN "title" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "adpages" ADD COLUMN "content" text DEFAULT '' NOT NULL;