/*
  Warnings:

  - You are about to drop the column `fecha` on the `asistencia` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `asistencia` table. All the data in the column will be lost.
  - Added the required column `fecha_asistencia` to the `asistencia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "asistencia" DROP COLUMN "fecha",
DROP COLUMN "tipo",
ADD COLUMN     "fecha_asistencia" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id_actividad" INTEGER,
ADD COLUMN     "id_conferencia" INTEGER;

-- AddForeignKey
ALTER TABLE "asistencia" ADD CONSTRAINT "asistencia_id_actividad_fkey" FOREIGN KEY ("id_actividad") REFERENCES "actividad"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asistencia" ADD CONSTRAINT "asistencia_id_conferencia_fkey" FOREIGN KEY ("id_conferencia") REFERENCES "conferencia"("id") ON DELETE SET NULL ON UPDATE CASCADE;
