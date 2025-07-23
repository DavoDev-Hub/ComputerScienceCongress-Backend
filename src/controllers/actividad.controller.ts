import { Request, Response } from "express";
import { actividadSchema } from "../schemas/actividad.schema";
import { prisma } from "../lib/prisma"

// Get all activities
export const getActividades = async (req: Request, res: Response) => {
    const actividades = await prisma.actividad.findMany();
    res.json(actividades);
};

/// Get an activity by id
export const getActividadById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const actividad = await prisma.actividad.findUnique({ where: { id } });

    if (!actividad) {
        return res.status(404).json({ error: 'Actividad no encontrada' });
    }
    res.json(actividad);
}

export const postActividad = async (req: Request, res: Response) => {
    const result = actividadSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: "Datos inválidos",
            detalles: result.error.format(),
        });
    }

    try {
        const nueva = await prisma.actividad.create({
            data: result.data,
        });

        res.status(201).json(nueva);
    } catch (error) {
        console.error("Error al crear actividad:", error);
        res.status(500).json({ error: "Error del servidor" });
    }
};


export const putActividad = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = actividadSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: 'Datos Invalidos',
            detalles: result.error.format()
        });
    }
    try {
        const actualizada = await prisma.actividad.update({
            where: { id },
            data: result.data
        });

        res.json(actualizada);
    } catch (error) {
        res.status(404).json({ error: 'La actividad no se encuentra, ingrese otra' });
    }
};

// Delete an activity by id
export const deleteActividad = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        await prisma.actividad.delete({ where: { id } });
        res.json({ mensaje: 'Actividad eliminada correctamente' });

    } catch (error) {
        res.status(400).json({ mensaje: 'Actividad no encontrada' })
    }
};


