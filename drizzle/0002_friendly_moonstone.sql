ALTER TABLE "test__refresh_tokens" RENAME TO "test__auth_tokens";--> statement-breakpoint
ALTER TABLE "test__auth_tokens" DROP CONSTRAINT "test__refresh_tokens_token_unique";--> statement-breakpoint
ALTER TABLE "test__auth_tokens" DROP CONSTRAINT "test__refresh_tokens_user_id_test__users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "test__auth_tokens" ADD CONSTRAINT "test__auth_tokens_user_id_test__users_id_fk" FOREIGN KEY ("user_id") REFERENCES "test__users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "test__auth_tokens" ADD CONSTRAINT "test__auth_tokens_token_unique" UNIQUE("token");