/*
  Warnings:

  - Added the required column `clientName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientPhone` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "clientName" TEXT NOT NULL,
ADD COLUMN     "clientPhone" TEXT NOT NULL;
