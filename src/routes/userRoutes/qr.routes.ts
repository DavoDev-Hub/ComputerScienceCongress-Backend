import { Router } from "express";
import { authUser } from "@/middlewares/authUser";
import {
  generarQRActividad,
  obtenerQRActividad,
  generarQRConferencia,
  obtenerQRConferencia,
} from "@/controllers/userControllers/qr.controller";

const router = Router();

// Actividades
router.post("/actividad/:id/generar", authUser, generarQRActividad);
router.get("/actividad/:id", authUser, obtenerQRActividad);

// Conferencias
router.post("/conferencia/:id/generar", authUser, generarQRConferencia);
router.get("/conferencia/:id", authUser, obtenerQRConferencia);

export default router;
