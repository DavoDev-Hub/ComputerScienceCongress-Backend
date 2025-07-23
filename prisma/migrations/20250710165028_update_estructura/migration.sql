/*
  Warnings:

  - You are about to drop the column `horaFin` on the `actividad` table. All the data in the column will be lost.
  - You are about to drop the column `horaInicio` on the `actividad` table. All the data in the column will be lost.
  - You are about to drop the column `imagen` on the `actividad` table. All the data in the column will be lost.
  - You are about to drop the column `horaFin` on the `conferencia` table. All the data in the column will be lost.
  - You are about to drop the column `horaInicio` on the `conferencia` table. All the data in the column will be lost.
  - You are about to drop the column `imagen` on the `conferencia` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "actividad" DROP COLUMN "horaFin",
DROP COLUMN "horaInicio",
DROP COLUMN "imagen",
ADD COLUMN     "fecha" TIMESTAMP(3),
ADD COLUMN     "hora" TIMESTAMP(3),
ADD COLUMN     "lugar" TEXT,
ADD COLUMN     "ponente" TEXT;

-- AlterTable
ALTER TABLE "conferencia" DROP COLUMN "horaFin",
DROP COLUMN "horaInicio",
DROP COLUMN "imagen",
ADD COLUMN     "fecha" TIMESTAMP(3),
ADD COLUMN     "hora" TIMESTAMP(3),
ADD COLUMN     "lugar" TEXT;
