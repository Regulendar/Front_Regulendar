/*
  Warnings:

  - You are about to drop the column `hostUserId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `participationIds` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `eventIds` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."EventRole" AS ENUM ('HOST', 'PARTICIPANT');

-- AlterTable
ALTER TABLE "public"."Event" DROP COLUMN "hostUserId",
DROP COLUMN "participationIds";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "eventIds";

-- CreateTable
CREATE TABLE "public"."EventParticipation" (
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "public"."EventRole" NOT NULL DEFAULT 'PARTICIPANT',

    CONSTRAINT "EventParticipation_pkey" PRIMARY KEY ("eventId","userId")
);

-- AddForeignKey
ALTER TABLE "public"."EventParticipation" ADD CONSTRAINT "EventParticipation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("eventId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventParticipation" ADD CONSTRAINT "EventParticipation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
