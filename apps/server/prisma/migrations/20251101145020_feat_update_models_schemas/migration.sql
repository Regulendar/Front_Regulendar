/*
  Warnings:

  - You are about to drop the `_EventToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_EventToUser" DROP CONSTRAINT "_EventToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_EventToUser" DROP CONSTRAINT "_EventToUser_B_fkey";

-- AlterTable
ALTER TABLE "public"."Event" ADD COLUMN     "participationId" TEXT[];

-- AlterTable
ALTER TABLE "public"."Organization" ADD COLUMN     "organizationDescription" TEXT;

-- DropTable
DROP TABLE "public"."_EventToUser";
