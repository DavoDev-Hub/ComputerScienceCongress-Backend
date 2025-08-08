import { Request, Response } from "express";
import { prisma } from "@/lib/prisma";

export const listConferencias = async (_req: Request, res: Response) => {
  try {
    const conferencias = await prisma.conferencia.findMany({
      orderBy: [{ fecha: "asc" }, { horaInicio: "asc" }],
    });

    return res.json(conferencias);
  } catch (e) {
    return res.status(500).json({ error: "Error al listar conferencias" });
  }
};
