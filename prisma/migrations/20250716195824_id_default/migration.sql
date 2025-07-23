-- AlterTable
CREATE SEQUENCE alumno_id_seq;
ALTER TABLE "alumno" ALTER COLUMN "id" SET DEFAULT nextval('alumno_id_seq');
ALTER SEQUENCE alumno_id_seq OWNED BY "alumno"."id";
