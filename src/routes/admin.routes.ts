import { Router } from "express";
const router = Router()
import {
    registrarAdmin,
    loginAdmin,
} from "@/controllers/admin.controller";
import { verificarSesion } from "@/controllers/admin.controller"
import { logoutAdmin } from "@/controllers/admin.controller"

router.post("/register", registrarAdmin)
router.post("/login", loginAdmin)
router.get("/check", verificarSesion)
router.post("/logout", logoutAdmin)

export default router

