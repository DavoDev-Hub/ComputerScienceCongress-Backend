import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import actividadRoutes from "./routes/actividad.routes";
import conferenciaRoutes from "./routes/conferencia.routes";
import alumnoRoutes from "./routes/alumno.routes"
import asistenciasRoutes from "./routes/asistencia.routes";
import dashboardRoutes from "./routes/dashboard.routes"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));
app.use(express.json());

// Admin routes
app.use("/admin/dashboard", dashboardRoutes);
app.use("/admin/actividades", actividadRoutes);
app.use("/admin/conferencias", conferenciaRoutes);
app.use("/admin/alumnos", alumnoRoutes);
app.use("/admin/asistencias", asistenciasRoutes)

// User routes

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Error interno del servidor" });
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

