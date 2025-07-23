/*
  Warnings:

  - Changed the type of `semestre` on the `alumno` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "alumno" DROP COLUMN "semestre",
ADD COLUMN     "semestre" INTEGER NOT NULL;
