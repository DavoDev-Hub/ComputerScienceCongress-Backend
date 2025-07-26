import { z } from "zod"

export const adminSchema = z.object({
    nombre: z
        .string()
        .min(3, "El nombre debe tener al menos 3 caracteres"),

    correo: z
        .string()
        .email("Debe ser un correo válido"),

    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres"),
})

