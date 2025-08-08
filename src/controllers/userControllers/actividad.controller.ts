import { Request, Response } from "express";
import { prisma } from "@/lib/prisma";
import { EnrollActivityInput } from "@/schemas/userSchemas/actividad.schema";

// tiny helper para empalmes
const overlap = (
  aStart?: Date | null,
  aEnd?: Date | null,
  bStart?: Date | null,
  bEnd?: Date | null,
) => {
  if (!aStart || !aEnd || !bStart || !bEnd) return false;
  return aStart < bEnd && bStart < aEnd;
};

// GET /user/activities?tipo=academic|recreational
export const listActivities = async (req: Request, res: Response) => {
  const tipo = (req.query.tipo as string | undefined)?.toLowerCase();
  if (tipo && !["academic", "recreational"].includes(tipo)) {
    return res.status(400).json({ error: "tipo inválido" });
  }
  try {
    const actividades = await prisma.actividad.findMany({
      where: tipo ? { tipo } : undefined,
      orderBy: [{ fecha: "asc" }, { horaInicio: "asc" }],
    });

    const withCounts = await Promise.all(
      actividades.map(async (a) => {
        const inscritos = await prisma.inscripcion.count({
          where: { id_actividad: a.id },
        });
        return { ...a, inscritos };
      }),
    );

    return res.json(withCounts);
  } catch (e) {
    return res.status(500).json({ error: "Error al listar actividades" });
  }
};

// GET /user/enrollments   -> actividades ya inscritas por el alumno
export const getMyEnrollments = async (req: Request, res: Response) => {
  const id_alumno = req.user?.id;
  if (!id_alumno) return res.status(401).json({ error: "No autorizado" });

  try {
    const inscripciones = await prisma.inscripcion.findMany({
      where: { id_alumno },
      include: { actividad: true },
      orderBy: { fecha_inscripcion: "desc" },
    });

    return res.json(
      inscripciones.map((i) => ({
        id_inscripcion: i.id_inscripcion,
        fecha_inscripcion: i.fecha_inscripcion,
        actividad: i.actividad,
      })),
    );
  } catch (e) {
    return res.status(500).json({ error: "Error al obtener inscripciones" });
  }
};

// POST /user/activities/enroll   body: { id_actividad }
export const enrollActivity = async (req: Request, res: Response) => {
  const id_alumno = req.user?.id;
  if (!id_alumno) return res.status(401).json({ error: "No autorizado" });

  const { id_actividad } = req.body as EnrollActivityInput;

  try {
    const actividad = await prisma.actividad.findUnique({
      where: { id: id_actividad },
    });
    if (!actividad)
      return res.status(404).json({ error: "Actividad no encontrada" });

    // Revisa cupo actual
    const inscritos = await prisma.inscripcion.count({
      where: { id_actividad },
    });
    if (inscritos >= actividad.cupo) {
      return res.status(409).json({ error: "Cupo lleno" });
    }

    // Reglas: máximo 1 por tipo
    const yaTieneDelTipo = await prisma.inscripcion.findFirst({
      where: {
        id_alumno,
        actividad: { tipo: actividad.tipo },
      },
      include: { actividad: true },
    });
    if (yaTieneDelTipo) {
      return res.status(409).json({
        error: `Ya estás inscrito a una actividad de tipo ${actividad.tipo}`,
        existente: yaTieneDelTipo.actividad,
      });
    }

    // Empalmes (opcional pero recomendado)
    const misInscripciones = await prisma.inscripcion.findMany({
      where: { id_alumno },
      include: { actividad: true },
    });
    const hayEmpalme = misInscripciones.some((i) =>
      overlap(
        actividad.horaInicio,
        actividad.horaFin,
        i.actividad?.horaInicio,
        i.actividad?.horaFin,
      ),
    );
    if (hayEmpalme) {
      return res.status(409).json({
        error: "Tienes un empalme de horario con otra actividad inscrita",
      });
    }

    // Transacción para crear inscripción (evita condiciones de carrera)
    const created = await prisma.$transaction(async (tx) => {
      const againCount = await tx.inscripcion.count({
        where: { id_actividad },
      });
      if (againCount >= actividad.cupo) throw new Error("Cupo lleno");

      return tx.inscripcion.create({
        data: {
          id_alumno,
          id_actividad,
          fecha_inscripcion: new Date(),
        },
      });
    });

    return res.status(201).json({ ok: true, inscripcion: created });
  } catch (e: any) {
    if (e?.message === "Cupo lleno") {
      return res.status(409).json({ error: "Cupo lleno" });
    }
    return res
      .status(500)
      .json({ error: "No se pudo inscribir a la actividad" });
  }
};
