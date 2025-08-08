/*
  Warnings:

  - A unique constraint covering the columns `[id_alumno,id_actividad]` on the table `inscripcion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "inscripcion_id_alumno_id_actividad_key" ON "inscripcion"("id_alumno", "id_actividad");
