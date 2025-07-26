import { Router } from "express";

const router = Router();
import {
    getAlumnos,
    getAlumnosById,
    postAlumnos,
    putAlumno,
    deleteAlumno
} from "@/controllers/alumno.controller";

router.get("/", getAlumnos);
router.get("/:id", getAlumnosById);
router.post("/", postAlumnos);
router.put("/:id", putAlumno);
router.delete("/:id", deleteAlumno);

export default router;
