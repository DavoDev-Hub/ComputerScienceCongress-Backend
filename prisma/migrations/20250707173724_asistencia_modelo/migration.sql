-- CreateTable
CREATE TABLE "asistencia" (
    "id" SERIAL NOT NULL,
    "id_alumno" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "asistencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alumno" (
    "id" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "semestre" TEXT NOT NULL,

    CONSTRAINT "alumno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "administrador" (
    "id_admin" SERIAL NOT NULL,
    "id_alumno" INTEGER NOT NULL,

    CONSTRAINT "administrador_pkey" PRIMARY KEY ("id_admin")
);

-- CreateTable
CREATE TABLE "inscripcion" (
    "id_inscripcion" SERIAL NOT NULL,
    "id_alumno" INTEGER NOT NULL,
    "id_actividad" INTEGER NOT NULL,
    "fecha_inscripcion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inscripcion_pkey" PRIMARY KEY ("id_inscripcion")
);

-- CreateTable
CREATE TABLE "qr_generado" (
    "id_qr" SERIAL NOT NULL,
    "id_alumno" INTEGER NOT NULL,
    "id_conferencia" INTEGER,
    "id_actividad" INTEGER,
    "fecha_generado" TIMESTAMP(3) NOT NULL,
    "fecha_expiracion" TIMESTAMP(3) NOT NULL,
    "estado" BOOLEAN NOT NULL,

    CONSTRAINT "qr_generado_pkey" PRIMARY KEY ("id_qr")
);

-- CreateIndex
CREATE UNIQUE INDEX "administrador_id_alumno_key" ON "administrador"("id_alumno");

-- AddForeignKey
ALTER TABLE "asistencia" ADD CONSTRAINT "asistencia_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "administrador" ADD CONSTRAINT "administrador_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscripcion" ADD CONSTRAINT "inscripcion_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscripcion" ADD CONSTRAINT "inscripcion_id_actividad_fkey" FOREIGN KEY ("id_actividad") REFERENCES "actividad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qr_generado" ADD CONSTRAINT "qr_generado_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qr_generado" ADD CONSTRAINT "qr_generado_id_conferencia_fkey" FOREIGN KEY ("id_conferencia") REFERENCES "conferencia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qr_generado" ADD CONSTRAINT "qr_generado_id_actividad_fkey" FOREIGN KEY ("id_actividad") REFERENCES "actividad"("id") ON DELETE SET NULL ON UPDATE CASCADE;
