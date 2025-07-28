import { Router } from "express";

const router = Router();
import {
    getAlumnos,
    getAlumnosById,
    postAlumnos,
    putAlumno,
    deleteAlumno
} from "@/controllers/alumno.controller";
import { authAdmin } from "@/middlewares/authAdmin";

router.get("/", authAdmin, getAlumnos);
router.get("/:id", authAdmin, getAlumnosById);
router.post("/", authAdmin, postAlumnos);
router.put("/:id", authAdmin, putAlumno);
router.delete("/:id", authAdmin, deleteAlumno);

export default router;
