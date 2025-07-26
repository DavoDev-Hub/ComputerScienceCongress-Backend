import { Request, Response } from "express"
import { prisma } from "@/lib/prisma"
import { hash } from "argon2"
import { adminSchema } from "@/schemas/admin.schema"

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

