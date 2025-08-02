import { Router } from "express";
const router = Router();

import { loginAlumno } from "@/controllers/userControllers/user.controller";

router.post("/login", loginAlumno);

export default router;
