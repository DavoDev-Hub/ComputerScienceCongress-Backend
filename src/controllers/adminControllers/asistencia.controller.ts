import { Request, Response } from "express";
import { asistenciaSchema } from "@/schemas/adminSchemas/asistencia.schema";
import { prisma } from "@/lib/prisma"

export const registrarAsistencia = async (req: Request, res: Response) => {
    try {
        const parsed = asistenciaSchema.safeParse(req.body)

        if (!parsed.success) {
            return res.status(400).json({
                error: "Datos inválidos",
                detalles: parsed.error.format(),
            })
        }

        const nuevaAsistencia = await prisma.asistencia.create({
            data: parsed.data,
        })

        return res.status(201).json(nuevaAsistencia)
    } catch (error) {
        console.error("Error al registrar asistencia:", error)
        return res.status(500).json({ error: "Error interno del servidor" })
    }
}

export const getAllAsistencias = async (req: Request, res: Response) => {
    try {
        const alumnos = await prisma.alumno.findMany({
            orderBy: { semestre: "asc" },
            include: {
                asistencias: {
                    include: {
                        conferencia: true,
                        actividad: true,
                    },
                },
            },
        });

        const resultado = alumnos.map((alumno) => {
            const detalleConferencias = alumno.asistencias
                .filter((a) => a.conferencia)
                .map((a) => ({
                    id: a.id,
                    titulo: a.conferencia!.nombre,
                    tipo: "conferencia",
                    lugar: a.conferencia!.lugar,
                    fecha: a.fecha_asistencia.toISOString().split("T")[0],
                    hora: "00:00",
                    ponente: a.conferencia!.ponente,
                }));

            const detalleActividades = alumno.asistencias
                .filter((a) => a.actividad)
                .map((a) => ({
                    id: a.id,
                    titulo: a.actividad!.nombre,
                    tipo: "actividad",
                    lugar: a.actividad!.lugar,
                    fecha: a.fecha_asistencia.toISOString().split("T")[0],
                    hora: "00:00",
                }));

            return {
                id: alumno.id,
                nombre: alumno.nombre,
                correo: alumno.correo,
                matricula: alumno.matricula,
                semestre: alumno.semestre,
                asistenciasConferencias: detalleConferencias.length,
                asistenciasActividades: detalleActividades.length,
                totalAsistencias: detalleConferencias.length + detalleActividades.length,
                detalle: {
                    conferencias: detalleConferencias,
                    actividades: detalleActividades,
                },
            };
        });

        return res.status(200).json(resultado);
    } catch (error) {
        console.error("Error al obtener todas las asistencias:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};


export const getAsistenciasPorAlumno = async (req: Request, res: Response) => {
    const idAlumno = parseInt(req.params.id)

    if (isNaN(idAlumno)) {
        return res.status(400).json({ error: "ID de alumno inválido" })
    }

    try {
        const asistencias = await prisma.asistencia.findMany({
            where: {
                id_alumno: idAlumno,
            },
            include: {
                actividad: {
                    select: { id: true, nombre: true },
                },
                conferencia: {
                    select: { id: true, nombre: true },
                },
            },
        })

        const asistenciasConTipo = asistencias.map((a) => ({
            id: a.id,
            fecha_asistencia: a.fecha_asistencia,
            tipo: a.actividad ? "actividad" : "conferencia",
            nombre: a.actividad?.nombre || a.conferencia?.nombre,
        }))

        return res.status(200).json(asistenciasConTipo)
    } catch (error) {
        console.error("Error al obtener asistencias del alumno:", error)
        return res.status(500).json({ error: "Error al obtener asistencias del alumno" })
    }
}

export const getRecentAttendances = async (req: Request, res: Response) => {
    try {
        const asistencias = await prisma.asistencia.findMany({
            orderBy: {
                fecha_asistencia: "desc",
            },
            take: 10,
            include: {
                alumno: true,
                actividad: true,
                conferencia: true,
            },
        });

        const datos = asistencias.map((a) => ({
            id: a.id,
            student: {
                name: a.alumno.nombre,
                matricula: a.alumno.matricula,
                email: a.alumno.correo,
            },
            activity: {
                title: a.actividad?.nombre || a.conferencia?.nombre || "Sin nombre",
                type: a.actividad ? "recreational" : "academic",
            },
            timestamp: a.fecha_asistencia.toISOString(),
            status: "success",
        }));

        return res.status(200).json(datos);
    } catch (error) {
        console.error("Error al obtener asistencias recientes:", error);
        return res.status(500).json({ error: "Error al obtener asistencias recientes" });
    }
};

export const deleteAsistencia = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" })
    }

    try {
        const asistencia = await prisma.asistencia.findUnique({ where: { id } })

        if (!asistencia) {
            return res.status(404).json({ error: "Asistencia no encontrada" })
        }

        await prisma.asistencia.delete({ where: { id } })

        return res.status(200).json({ mensaje: "Asistencia eliminada correctamente" })
    } catch (error) {
        console.error("Error al eliminar asistencia:", error)
        return res.status(500).json({ error: "Error al eliminar asistencia" })
    }
}

