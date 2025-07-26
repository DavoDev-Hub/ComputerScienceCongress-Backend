import { Router } from "express"
import {
    registrarAsistencia,
    getAllAsistencias,
    getAsistenciasPorAlumno,
    getRecentAttendances,
    deleteAsistencia
} from "@/controllers/asistencia.controller"
const router = Router()

router.post("/", registrarAsistencia)
router.get("/", getAllAsistencias)
// router.get("/alumno/:id", getAsistenciasPorAlumno)
router.get("/recientes", getRecentAttendances)
router.delete("/:id", deleteAsistencia)
export default router

