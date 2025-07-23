/*
  Warnings:

  - You are about to drop the column `hora` on the `actividad` table. All the data in the column will be lost.
  - You are about to drop the column `hora` on the `conferencia` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "actividad" DROP COLUMN "hora",
ADD COLUMN     "horaFin" TIMESTAMP(3),
ADD COLUMN     "horaInicio" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "conferencia" DROP COLUMN "hora",
ADD COLUMN     "horaFin" TIMESTAMP(3),
ADD COLUMN     "horaInicio" TIMESTAMP(3);
