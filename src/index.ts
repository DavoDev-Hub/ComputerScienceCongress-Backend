require('module-alias/register')
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// AdminRoutes
import actividadRoutes from "@/routes/adminRoutes/actividad.routes"
import conferenciaRoutes from "@/routes/adminRoutes/conferencia.routes";
import alumnoRoutes from "@/routes/adminRoutes/alumno.routes"
import asistenciasRoutes from "@/routes/adminRoutes/asistencia.routes";
import dashboardRoutes from "@/routes/adminRoutes/dashboard.routes"
import adminRoutes from "@/routes/adminRoutes/admin.routes"

// UserRoutes

import cookieParser from "cookie-parser"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', 1)

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = (process.env.CORS_ORIGIN || "").split(",");

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));


app.use(cookieParser())
app.use(express.json());

// Admin routes
app.use("/admin/dashboard", dashboardRoutes);
app.use("/admin/actividades", actividadRoutes);
app.use("/admin/conferencias", conferenciaRoutes);
app.use("/admin/alumnos", alumnoRoutes);
app.use("/admin/asistencias", asistenciasRoutes)
app.use("/admin/auth", adminRoutes)

// User routes


app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Error interno del servidor" });
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

