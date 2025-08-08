require("module-alias/register");
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// AdminRoutes
import adminRoutes from "@/routes/adminRoutes/admin.routes";
import adminActividadRoutes from "@/routes/adminRoutes/actividad.routes";
import adminConferenciaRoutes from "@/routes/adminRoutes/conferencia.routes";
import adminAlumnoRoutes from "@/routes/adminRoutes/alumno.routes";
import adminAsistenciasRoutes from "@/routes/adminRoutes/asistencia.routes";
import adminDashboardRoutes from "@/routes/adminRoutes/dashboard.routes";

// UserRoutes
import userRoutes from "@/routes/userRoutes/user.routes";
import userDashboardRoutes from "@/routes/userRoutes/dashboard.routes";
import userActividadesRoutes from "@/routes/userRoutes/actividad.routes";

import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1);

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = (process.env.CORS_ORIGIN || "").split(",");

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

// Admin routes
app.use("/admin/auth", adminRoutes);
app.use("/admin/dashboard", adminDashboardRoutes);
app.use("/admin/actividades", adminActividadRoutes);
app.use("/admin/conferencias", adminConferenciaRoutes);
app.use("/admin/alumnos", adminAlumnoRoutes);
app.use("/admin/asistencias", adminAsistenciasRoutes);

// User routes
app.use("/user/auth", userRoutes);
app.use("/user/dashboard", userDashboardRoutes);
app.use("/user/actividades", userActividadesRoutes);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Error interno del servidor" });
  },
);
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
