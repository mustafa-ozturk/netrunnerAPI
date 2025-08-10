CREATE TABLE "market_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"item_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "hacks" ALTER COLUMN "target" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "hacks" ALTER COLUMN "target" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "value" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "market_items" ADD CONSTRAINT "market_items_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "market_items" ADD CONSTRAINT "market_items_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE cascade ON UPDATE no action;