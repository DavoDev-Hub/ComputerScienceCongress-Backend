import { Router } from "express";
const router = Router();
import {
    getActividades,
    getActividadById,
    postActividad,
    putActividad,
    deleteActividad
} from "@/controllers/adminControllers/actividad.controller";
import { authAdmin } from "@/middlewares/authAdmin";

router.get("/", authAdmin, getActividades);
router.get("/:id", authAdmin, getActividadById);
router.post("/", authAdmin, postActividad);
router.put("/:id", authAdmin, putActividad);
router.delete("/:id", authAdmin, deleteActividad);

export default router;

