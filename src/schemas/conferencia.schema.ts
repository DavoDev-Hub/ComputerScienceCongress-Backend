import { z } from "zod";

export const conferenciaSchema = z.object({
    nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    ponente: z.string().min(3, "El ponente debe tener al menos 3 caracteres"),
    descripcion: z.string().min(5, "La descripción debe tener al menos 5 caracteres"),
    lugar: z.string().min(3, "El lugar debe tener al menos 3 caracteres"),
    fecha: z.coerce.date({ invalid_type_error: "La fecha debe ser una fecha válida" }),
    horaInicio: z.coerce.date({ invalid_type_error: "La hora debe ser una fecha/hora válida" }),
    horaFin: z.coerce.date({ invalid_type_error: "La hora debe ser una fecha/hora válida" }),
});

