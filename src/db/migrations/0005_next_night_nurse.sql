ALTER TABLE "items" ALTER COLUMN "item_name" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "item_description" varchar(512) NOT NULL;