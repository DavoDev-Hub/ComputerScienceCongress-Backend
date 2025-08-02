import { z } from "zod"

export const alumnoLoginSchema = z.object({
    correo: z.string().email().refine(val => val.endsWith("@edu.uaa.mx"), {
        message: "El correo debe ser institucional (@edu.uaa.mx)"
    }),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
})

