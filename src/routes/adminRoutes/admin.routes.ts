import { Router } from "express";
const router = Router()
import {
    loginAdmin,
    logoutAdmin
} from "@/controllers/adminControllers/admin.controller";
import { verificarSesion } from "@/controllers/adminControllers/admin.controller"
import { loginLimiter } from "@/middlewares/authAdmin";

router.post("/login", loginLimiter, loginAdmin)
router.get("/check", verificarSesion)
router.post("/logout", logoutAdmin)

export default router

