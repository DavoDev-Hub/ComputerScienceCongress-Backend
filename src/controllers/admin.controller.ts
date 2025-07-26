import { Request, Response } from "express"
import { prisma } from "@/lib/prisma"
import { hash, verify } from "argon2"
import { adminSchema, adminLoginSchema } from "@/schemas/admin.schema"
import jwt from "jsonwebtoken"

export const registrarAdmin = async (req: Request, res: Response) => {
    try {
        const parsed = adminSchema.safeParse(req.body)
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.format() })
        }

        const { nombre, correo, password } = parsed.data

        const existingAdmin = await prisma.administrador.findUnique({
            where: { correo }
        })

        if (existingAdmin) {
            return res.status(409).json({ error: "Este correo ya está registrado como administrador." })
        }

        const hashedPassword = await hash(password)

        const newAdmin = await prisma.administrador.create({
            data: {
                nombre,
                correo,
                passwordHash: hashedPassword
            },
            select: {
                id: true,
                nombre: true,
                correo: true
            }
        })

        return res.status(201).json(newAdmin)
    } catch (error) {
        console.error("Error al registrar administrador:", error)
        return res.status(500).json({ error: "Error interno del servidor." })
    }
}


export const loginAdmin = async (req: Request, res: Response) => {
    try {
        const parsed = adminLoginSchema.safeParse(req.body)
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.format() })
        }

        const { correo, password } = parsed.data

        const admin = await prisma.administrador.findUnique({
            where: { correo }
        })

        if (!admin) {
            return res.status(401).json({ error: "Credenciales inválidas" })
        }

        const validPassword = await verify(admin.passwordHash, password)
        if (!validPassword) {
            return res.status(401).json({ error: "Credenciales inválidas" })
        }

        const token = jwt.sign(
            { id: admin.id, correo: admin.correo, role: "admin" },
            process.env.JWT_SECRET!,
            { expiresIn: "8h" }
        )

        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            token,
            admin: {
                id: admin.id,
                nombre: admin.nombre,
                correo: admin.correo
            }
        })
    } catch (error) {
        console.error("Error en loginAdmin:", error)
        return res.status(500).json({ error: "Error interno del servidor." })
    }
}

