ALTER TABLE "adusers" ALTER COLUMN "star" SET DEFAULT 5;--> statement-breakpoint
ALTER TABLE "adpages" ALTER COLUMN "user_id" DROP NOT NULL;