ALTER TABLE "stats" ALTER COLUMN "experience" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "stats" ALTER COLUMN "experience" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "stats" ALTER COLUMN "eurodollars" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "stats" ALTER COLUMN "eurodollars" DROP NOT NULL;