/*
  Warnings:

  - A unique constraint covering the columns `[correo]` on the table `alumno` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[matricula]` on the table `alumno` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `matricula` on the `alumno` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "alumno" DROP COLUMN "matricula",
ADD COLUMN     "matricula" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "alumno_correo_key" ON "alumno"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "alumno_matricula_key" ON "alumno"("matricula");
