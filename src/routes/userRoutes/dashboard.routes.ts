import { Router } from "express";
const router = Router();

import { authUser } from "@/middlewares/authUser";
import { getDashboardAlumno } from "@/controllers/userControllers/dashboard.controller";

router.get("/", authUser, getDashboardAlumno);

export default router;
