import { Request, Response } from "express"
import { prisma } from "@/lib/prisma"
import { verify } from "argon2"
import { adminLoginSchema } from "@/schemas/admin.schema"
import jwt from "jsonwebtoken"

export const loginAdmin = async (req: Request, res: Response) => {
    try {
        const parsed = adminLoginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.format() });
        }

        const { correo, password } = parsed.data;

        const admin = await prisma.administrador.findUnique({
            where: { correo }
        });

        if (!admin) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const validPassword = await verify(admin.passwordHash, password);
        if (!validPassword) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const token = jwt.sign(
            { id: admin.id, correo: admin.correo, role: "admin" },
            process.env.JWT_SECRET!,
            { expiresIn: "8h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 8,
            sameSite: "lax"
        });

        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            admin: {
                id: admin.id,
                nombre: admin.nombre,
                correo: admin.correo
            }
        });
    } catch (error) {
        console.error("Error en loginAdmin:", error);
        return res.status(500).json({ error: "Error interno del servidor." });
    }
};


export const verificarSesion = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ error: "No autenticado" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        return res.status(200).json({ authenticated: true, user: decoded })
    } catch (error) {
        return res.status(401).json({ authenticated: false, error: "Token inválido o expirado" })
    }
}
export const logoutAdmin = (req: Request, res: Response) => {
    res.clearCookie("token", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    })

    return res.status(200).json({ message: "Sesión cerrada correctamente" })
}
