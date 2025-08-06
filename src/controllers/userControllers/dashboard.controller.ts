import { Request, Response } from "express";
import { prisma } from "@/lib/prisma";

export const getDashboardAlumno = async (req: Request, res: Response) => {
  const id_alumno = req.user?.id;

  if (!id_alumno) {
    return res.status(401).json({ error: "No autorizado" });
  }

  try {
    const inscripciones = await prisma.inscripcion.findMany({
      where: { id_alumno },
      include: { actividad: true },
    });

    const conferenciasAsistidas = await prisma.asistencia.findMany({
      where: {
        id_alumno,
        id_conferencia: { not: null },
      },
      include: { conferencia: true },
    });

    const actividades = inscripciones.map((i) => i.actividad);
    const conferencias = conferenciasAsistidas.map((a) => a.conferencia);

    return res.json({
      actividades,
      conferencias,
    });
  } catch (error) {
    console.error("Error al cargar dashboard del alumno:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
