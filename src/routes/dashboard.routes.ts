import { Router } from "express";
import { getDashboardData } from "../controllers/dashboard.controller";
import { authAdmin } from "@/middlewares/authAdmin";

const router = Router()

router.get("/", authAdmin, getDashboardData);

export default router
