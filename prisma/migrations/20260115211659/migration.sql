/*
  Warnings:

  - A unique constraint covering the columns `[trxId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "trxId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_trxId_key" ON "Order"("trxId");
