import { Router } from "express";
const router = Router();

import { loginAlumno, registerAlumno } from "@/controllers/userControllers/user.controller";

router.post("/login", loginAlumno);
router.post("/register", registerAlumno);
export default router;
