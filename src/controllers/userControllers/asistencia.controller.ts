import { Request, Response } from "express";
import { prisma } from "@/lib/prisma";

export const listMisAsistencias = async (req: Request, res: Response) => {
  try {
    const id_alumno = req.user?.id;
    if (!id_alumno) return res.status(401).json({ error: "No autorizado" });

    const registros = await prisma.asistencia.findMany({
      where: { id_alumno },
      select: {
        id: true,
        id_actividad: true,
        id_conferencia: true,
        fecha_asistencia: true,
      },
      orderBy: { fecha_asistencia: "desc" },
    });

    return res.json(registros);
  } catch (e) {
    console.error("Error al listar mis asistencias:", e);
    return res.status(500).json({ error: "Error al listar asistencias" });
  }
};
