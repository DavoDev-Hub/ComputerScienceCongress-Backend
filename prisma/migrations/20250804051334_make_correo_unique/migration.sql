/*
  Warnings:

  - A unique constraint covering the columns `[correo]` on the table `VerificacionCorreo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VerificacionCorreo_correo_key" ON "VerificacionCorreo"("correo");
