-- DropIndex
DROP INDEX "TeamMember_teamId_idx";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "storyId" TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE SET NULL ON UPDATE CASCADE;
