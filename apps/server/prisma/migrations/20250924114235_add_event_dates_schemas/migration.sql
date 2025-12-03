/*
  Warnings:

  - Added the required column `eventDateDay` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventDateMonth` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventDateYear` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Event" ADD COLUMN     "eventDateDay" INTEGER NOT NULL,
ADD COLUMN     "eventDateMonth" INTEGER NOT NULL,
ADD COLUMN     "eventDateYear" INTEGER NOT NULL,
ALTER COLUMN "eventStartAt" SET DATA TYPE TEXT;
