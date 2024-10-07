-- DB作成
CREATE DATABASE k_on_line;
-- 作成したDBに接続
\c k_on_line;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'Role') THEN
        CREATE TYPE "Role" AS ENUM ('GRADUATE', 'STUDENT');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'Part') THEN
        CREATE TYPE "Part" AS ENUM (
            'VOCAL',
            'BACKING_GUITER',
            'LEAD_GUITER',
            'BASS',
            'DRUMS',
            'KEYBOARD',
            'OTHER'
            );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'AccountRole') THEN
        CREATE TYPE "AccountRole" AS ENUM ('ADMIN', 'USER');
    END IF;
END$$;

-- Create Users table
CREATE TABLE "users" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT,
  "user_id" TEXT UNIQUE,
  "password" TEXT,
  "email" TEXT UNIQUE,
  "email_verified" TIMESTAMP,
  "image" TEXT,
  "role" "AccountRole",
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create Bookings table
CREATE TABLE "bookings" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW(),
  "booking_date" TIMESTAMP NOT NULL,
  "booking_time" INT NOT NULL,
  "regist_name" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "is_deleted" BOOLEAN DEFAULT FALSE,
  FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL
);

-- Create Profiles table
CREATE TABLE "profiles" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW(),
  "expected" INT NOT NULL,
  "role" "Role" NOT NULL,
  "is_deleted" BOOLEAN DEFAULT FALSE,
  FOREIGN KEY ("id") REFERENCES "users" ("id") ON DELETE CASCADE
);

-- Create Accounts table
CREATE TABLE "accounts" (
  "user_id" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "provider_account_id" TEXT NOT NULL,
  "refresh_token" TEXT,
  "access_token" TEXT,
  "expires_at" INT,
  "token_type" TEXT,
  "scope" TEXT,
  "id_token" TEXT,
  "session_state" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY ("provider", "provider_account_id"),
  FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
);

-- Create Sessions table
CREATE TABLE "sessions" (
  "session_token" TEXT UNIQUE NOT NULL,
  "user_id" TEXT NOT NULL,
  "expires" TIMESTAMP NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
);

-- Create VerificationTokens table
CREATE TABLE "VerificationTokens" (
  "identifier" TEXT NOT NULL,
  "token" TEXT NOT NULL,
  "expires" TIMESTAMP NOT NULL,
  PRIMARY KEY ("identifier", "token")
);

-- Create PadLocks table
CREATE TABLE "PadLocks" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW(),
  "name" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "is_deleted" BOOLEAN DEFAULT FALSE
);