import { Router } from "express";
const router = Router();

import {
  loginAlumno,
  registerAlumno,
  //  solicitarCodigoVerificacion,
} from "@/controllers/userControllers/user.controller";

router.post("/login", loginAlumno);
router.post("/register", registerAlumno);
// router.post("/verificacion", solicitarCodigoVerificacion);
export default router;
