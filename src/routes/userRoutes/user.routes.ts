import { Router } from "express";
const router = Router();

import {
  loginAlumno,
  registerAlumno,
  //  solicitarCodigoVerificacion,
  logoutUser,
} from "@/controllers/userControllers/user.controller";

router.post("/login", loginAlumno);
router.post("/register", registerAlumno);
router.post("/logout", logoutUser);
// router.post("/verificacion", solicitarCodigoVerificacion);
export default router;
