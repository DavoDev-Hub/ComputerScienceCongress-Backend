import { Request, Response } from "express";
import { prisma } from "@/lib/prisma";

export const verificarCodigo = async (req: Request, res: Response) => {
    const { correo, codigo } = req.body;

    try {
        const verificacion = await prisma.verificacionCorreo.findFirst({
            where: { correo },
            orderBy: { creadoEn: "desc" }
        });

        if (!verificacion || verificacion.codigo !== codigo) {
            return res.status(400).json({ error: "Código de verificación inválido." });
        }

        if (verificacion.expiracion < new Date()) {
            return res.status(400).json({ error: "El código ha expirado." });
        }

        await prisma.alumno.update({
            where: { correo },
            data: { emailVerified: true }
        });

        await prisma.verificacionCorreo.delete({
            where: { id: verificacion.id }
        });

        return res.status(200).json({ message: "Correo verificado exitosamente." });

    } catch (error) {
        console.error("Error en verificarCodigo:", error);
        return res.status(500).json({ error: "Error interno del servidor." });
    }
};

