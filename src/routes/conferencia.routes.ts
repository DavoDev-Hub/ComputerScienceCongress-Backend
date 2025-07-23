import { Router } from "express";

const router = Router();

import {
    getConferencia,
    getConferenciaById,
    postConferencia,
    putConferencia,
    deleteConferencia
} from "../controllers/conferencia.controller";


router.get("/", getConferencia);
router.get("/:id", getConferenciaById);
router.post("/", postConferencia);
router.put("/:id", putConferencia);
router.delete("/:id", deleteConferencia);

export default router;
