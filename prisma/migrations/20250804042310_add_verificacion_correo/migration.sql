-- CreateTable
CREATE TABLE "VerificacionCorreo" (
    "id" SERIAL NOT NULL,
    "correo" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "expiracion" TIMESTAMP(3) NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificacionCorreo_pkey" PRIMARY KEY ("id")
);
