import { Router } from "express"
import {
    registrarAsistencia,
    getAllAsistencias,
    getAsistenciasPorAlumno,
    getRecentAttendances,
    deleteAsistencia
} from "@/controllers/adminControllers/asistencia.controller"
const router = Router()
import { authAdmin } from "@/middlewares/authAdmin"

router.post("/", authAdmin, registrarAsistencia)
router.get("/", authAdmin, getAllAsistencias)
// router.get("/alumno/:id", getAsistenciasPorAlumno)
router.get("/recientes", authAdmin, getRecentAttendances)
router.delete("/:id", authAdmin, deleteAsistencia)

export default router
