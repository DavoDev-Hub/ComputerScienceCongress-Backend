import { Request, Response } from "express";
import { alumnoSchema } from "@/schemas/adminSchemas/alumno.schema";
import { prisma } from "@/lib/prisma"

export const getAlumnos = async (req: Request, res: Response) => {
    const alumnos = await prisma.alumno.findMany()
    res.json(alumnos)
}

export const getAlumnosById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const alumno = await prisma.alumno.findUnique({ where: { id } })

    if (!alumno) {
        return res.status(404).json({ error: ' Alumno no encontrado ' })
    }
    res.json(alumno)
}

export const postAlumnos = async (req: Request, res: Response) => {
    const result = alumnoSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: "Datos invalidos",
            detalles: result.error.format(),
        })
    }

    try {
        const nueva = await prisma.alumno.create({
            data: result.data,
        });

        res.status(201).json(nueva);
    } catch (error) {
        console.error("Error al crear el alumno:", error);
        res.status(500).json({ error: "Error del servidor" });
    }
}


export const putAlumno = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = alumnoSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: 'Datos Invalidos',
            detalles: result.error.format()
        });
    }
    try {
        const actualizada = await prisma.alumno.update({
            where: { id },
            data: result.data
        });

        res.json(actualizada);
    } catch (error) {
        res.status(404).json({ error: 'El alumno no se encuentra, ingrese otro' });
    }
};

// Delete an activity by id
export const deleteAlumno = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        await prisma.actividad.delete({ where: { id } });
        res.json({ mensaje: 'Actividad eliminada correctamente' });

    } catch (error) {
        res.status(400).json({ mensaje: 'Alumno no encontrado' })
    }
};




