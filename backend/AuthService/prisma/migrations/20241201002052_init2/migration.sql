/*
  Warnings:

  - You are about to drop the column `businessName` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "businessName",
ADD COLUMN     "business_name" TEXT;
