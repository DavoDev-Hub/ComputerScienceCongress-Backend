/*
  Warnings:

  - The primary key for the `administrador` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_admin` on the `administrador` table. All the data in the column will be lost.
  - You are about to drop the column `id_alumno` on the `administrador` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[correo]` on the table `administrador` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `correo` to the `administrador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `administrador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `administrador` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "administrador" DROP CONSTRAINT "administrador_id_alumno_fkey";

-- DropIndex
DROP INDEX "administrador_id_alumno_key";

-- AlterTable
ALTER TABLE "administrador" DROP CONSTRAINT "administrador_pkey",
DROP COLUMN "id_admin",
DROP COLUMN "id_alumno",
ADD COLUMN     "correo" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "nombre" TEXT NOT NULL,
ADD COLUMN     "passwordHash" TEXT NOT NULL,
ADD CONSTRAINT "administrador_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "administrador_correo_key" ON "administrador"("correo");
