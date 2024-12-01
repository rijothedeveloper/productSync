/*
  Warnings:

  - You are about to drop the column `business_name` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "business_name",
ADD COLUMN     "busines_name" TEXT;
