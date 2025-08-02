import { Router } from "express";

const router = Router();

import {
    getConferencia,
    getConferenciaById,
    postConferencia,
    putConferencia,
    deleteConferencia
} from "@/controllers/adminControllers/conferencia.controller";
import { authAdmin } from "@/middlewares/authAdmin";

router.get("/", authAdmin, getConferencia);
router.get("/:id", authAdmin, getConferenciaById);
router.post("/", authAdmin, postConferencia);
router.put("/:id", authAdmin, putConferencia);
router.delete("/:id", authAdmin, deleteConferencia);

export default router;
