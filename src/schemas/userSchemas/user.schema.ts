import { z } from "zod"

export const alumnoLoginSchema = z.object({
    correo: z.string().email().refine(val => val.endsWith("@edu.uaa.mx"), {
        message: "El correo debe ser institucional (@edu.uaa.mx)"
    }),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
})


export const alumnoRegisterSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    correo: z.string().email("Correo inválido").endsWith("@edu.uaa.mx", "Debe ser un correo institucional"),
    matricula: z.number().int().positive("La matrícula debe ser positiva"),
    semestre: z.number().int().min(1).max(12),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

