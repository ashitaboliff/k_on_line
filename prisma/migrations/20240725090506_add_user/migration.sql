-- CreateEnum
CREATE TYPE "Role" AS ENUM ('GRADUATE', 'STUDENT');

-- CreateTable
CREATE TABLE "User" (
    "liff_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL,
    "part" INTEGER[],
    "password" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("liff_id")
);

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("liff_id") ON DELETE RESTRICT ON UPDATE CASCADE;
