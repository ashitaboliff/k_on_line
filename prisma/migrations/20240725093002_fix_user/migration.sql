/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_user_id_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "liff_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL,
    "part" INTEGER[],
    "password" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("liff_id")
);

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("liff_id") ON DELETE RESTRICT ON UPDATE CASCADE;
