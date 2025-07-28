import { z } from "zod"

export const adminLoginSchema = z.object({
    correo: z
        .string()
        .email("Debe ser un correo válido"),

    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres"),
})


