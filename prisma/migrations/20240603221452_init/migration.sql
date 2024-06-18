-- CreateTable
CREATE TABLE "booking" (
    "id" SERIAL NOT NULL,
    "creatsd_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "booking_date" TIMESTAMP(3) NOT NULL,
    "booking_time" INTEGER NOT NULL,
    "regist_name" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);
