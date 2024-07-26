-- DB作成
CREATE DATABASE k_on_line;
-- 作成したDBに接続
\c k_on_line;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'Role') THEN
        CREATE TYPE "Role" AS ENUM ('GRADUATE', 'STUDENT');
    END IF;
END$$;

-- Create the "user" table
CREATE TABLE IF NOT EXISTS "user" (
    "liff_id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "expected" INTEGER NOT NULL,
    "role" "Role" NOT NULL,
    "part" INTEGER[] NOT NULL,
    "password" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create the "booking" table
CREATE TABLE IF NOT EXISTS "booking" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_id" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "booking_date" TIMESTAMPTZ NOT NULL,
    "booking_time" INTEGER NOT NULL,
    "regist_name" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_user FOREIGN KEY ("user_id") REFERENCES "user"("liff_id") ON DELETE SET NULL
);