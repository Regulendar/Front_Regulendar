/*
  Warnings:

  - Added the required column `hostUserId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Event" ADD COLUMN     "hostUserId" TEXT NOT NULL;
