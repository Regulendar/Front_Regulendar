-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_hostOrganizationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrganizationMember" DROP CONSTRAINT "OrganizationMember_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_hostOrganizationId_fkey" FOREIGN KEY ("hostOrganizationId") REFERENCES "public"."Organization"("organizationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrganizationMember" ADD CONSTRAINT "OrganizationMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
