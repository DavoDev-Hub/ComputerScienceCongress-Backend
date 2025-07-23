/*
  Warnings:

  - You are about to drop the column `ponente` on the `actividad` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "actividad" DROP COLUMN "ponente";

-- AlterTable
ALTER TABLE "conferencia" ADD COLUMN     "ponente" TEXT;
