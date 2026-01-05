-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('CANCELLED', 'SCHEDULED', 'PROCESSING', 'COMPLETED');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "eventStatus" "EventStatus" NOT NULL DEFAULT 'SCHEDULED';
