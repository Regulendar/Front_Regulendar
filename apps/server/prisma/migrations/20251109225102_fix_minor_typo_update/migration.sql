/*
  Warnings:

  - You are about to drop the column `participationId` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Event" DROP COLUMN "participationId",
ADD COLUMN     "participationIds" TEXT[];
