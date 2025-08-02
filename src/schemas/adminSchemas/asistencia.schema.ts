import { z } from "zod"

export const asistenciaSchema = z.object({
    id_alumno: z.number({
        required_error: "El ID del alumno es obligatorio",
        invalid_type_error: "El ID del alumno debe ser un número",
    }),
    id_actividad: z.number({
        invalid_type_error: "El ID de la actividad debe ser un número",
    }).optional().nullable(),

    id_conferencia: z.number({
        invalid_type_error: "El ID de la conferencia debe ser un número",
    }).optional().nullable(),

    fecha_asistencia: z.coerce.date({
        required_error: "La fecha de asistencia es obligatoria",
        invalid_type_error: "La fecha debe ser válida",
    }),
}).refine((data) => {
    return (data.id_actividad && !data.id_conferencia) || (!data.id_actividad && data.id_conferencia)
}, {
    message: "Debes proporcionar solo un ID de actividad o uno de conferencia, no ambos",
    path: ["id_actividad", "id_conferencia"],
})

