import { Router } from "express";

const router = Router();
import {
    getActividades,
    getActividadById,
    postActividad,
    putActividad,
    deleteActividad
} from "../controllers/actividad.controller";


router.get("/", getActividades);
router.get("/:id", getActividadById);
router.post("/", postActividad);
router.put("/:id", putActividad);
router.delete("/:id", deleteActividad);

export default router;

