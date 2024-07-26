/*
  Warnings:

  - The primary key for the `booking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `creatsd_at` on the `booking` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking" DROP CONSTRAINT "booking_pkey",
DROP COLUMN "creatsd_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "booking_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "booking_id_seq";
