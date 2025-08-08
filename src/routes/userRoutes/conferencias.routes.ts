import { Router } from "express";
import { authUser } from "@/middlewares/authUser";
import { listConferencias } from "@/controllers/userControllers/conferencia.controller";

const router = Router();

router.get("/", authUser, listConferencias);

export default router;
