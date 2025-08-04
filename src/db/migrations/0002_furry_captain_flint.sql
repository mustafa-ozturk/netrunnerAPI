CREATE TABLE "hacks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"completes_at" timestamp NOT NULL,
	"user_id" uuid NOT NULL,
	"status" varchar(256) NOT NULL,
	CONSTRAINT "hacks_status_unique" UNIQUE("status")
);
--> statement-breakpoint
ALTER TABLE "hacks" ADD CONSTRAINT "hacks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;