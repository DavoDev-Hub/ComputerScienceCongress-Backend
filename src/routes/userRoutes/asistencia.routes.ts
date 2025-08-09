import { Router } from "express";
import { authUser } from "@/middlewares/authUser";
import { listMisAsistencias } from "@/controllers/userControllers/asistencia.controller";

const router = Router();

router.get("/", authUser, listMisAsistencias);

export default router;
