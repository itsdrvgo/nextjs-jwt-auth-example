CREATE TABLE IF NOT EXISTS "test__refresh_tokens" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "test__refresh_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
DROP TABLE "test__sessions";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_id_idx" ON "test__refresh_tokens" ("user_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "test__refresh_tokens" ADD CONSTRAINT "test__refresh_tokens_user_id_test__users_id_fk" FOREIGN KEY ("user_id") REFERENCES "test__users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
