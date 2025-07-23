import { Request, Response } from 'express'
import { prisma } from "../lib/prisma"

export const getDashboardData = async (req: Request, res: Response) => {
    try {
        const totalEstudiantes = await prisma.alumno.count()
        const totalActividades = await prisma.actividad.count()

        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0)

        const manana = new Date(hoy)
        manana.setDate(manana.getDate() + 1)

        const asistenciasHoy = await prisma.asistencia.count({
            where: {
                fecha_asistencia: {
                    gte: hoy,
                    lt: manana,
                },
            },
        })

        const qrEscaneadosHoy = await prisma.qr_generado.count({
            where: {
                fecha_generado: {
                    gte: hoy,
                    lt: manana,
                },
            },
        })

        const actividadesActivas = await prisma.actividad.findMany({
            where: {
                fecha: {
                    gte: hoy,
                    lt: manana,
                },
            },
            include: {
                asistencia: true,
            },
        })

        const actividadesActivasFormateadas = actividadesActivas.map((actividad) => ({
            id: actividad.id,
            nombre: actividad.nombre,
            tipo: actividad.tipo as "academico" | "recreativo",
            hora: actividad.horaInicio?.toISOString().slice(11, 16) ?? "00:00",
            asistentes: actividad.asistencia.length,
            cupo: actividad.cupo,
        }))

        const recentAttendances = await prisma.asistencia.findMany({
            take: 5,
            orderBy: { fecha_asistencia: "desc" },
            include: {
                alumno: true,
                actividad: true,
                conferencia: true,
            },
        })

        const recentAttendancesFormatted = recentAttendances.map((asistencia) => ({
            id: asistencia.id,
            estudiante: asistencia.alumno.nombre,
            matricula: asistencia.alumno.matricula,
            actividad: asistencia.actividad?.nombre || asistencia.conferencia?.nombre || "Sin nombre",
            tiempo: asistencia.fecha_asistencia.toISOString(),
        }))

        res.json({
            totalEstudiantes,
            totalActividades,
            asistenciasHoy,
            qrEscaneadosHoy,
            actividadesActivas: actividadesActivasFormateadas,
            recentAttendances: recentAttendancesFormatted,
        })
    } catch (error) {
        console.error("Error en /admin/dashboard:", error)
        res.status(500).json({ error: "Ocurrió un error al obtener los datos del dashboard" })
    }
}
