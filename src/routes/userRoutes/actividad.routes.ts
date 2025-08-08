import { Router } from "express";
import { authUser } from "@/middlewares/authUser";
import { validate } from "@/middlewares/validate";
import { enrollActivitySchema } from "@/schemas/userSchemas/actividad.schema";
import {
  listActivities,
  getMyEnrollments,
  enrollActivity,
} from "@/controllers/userControllers/actividad.controller";

const router = Router();

router.get("/", authUser, listActivities);

// Mis inscripciones
router.get("/inscripciones", authUser, getMyEnrollments);

// Inscribirse
router.post(
  "/activities/inscribirse",
  authUser,
  validate(enrollActivitySchema),
  enrollActivity,
);

export default router;
