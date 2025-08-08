import { z } from "zod";

export const enrollActivitySchema = z.object({
  id_actividad: z.number().int().positive(),
});

export type EnrollActivityInput = z.infer<typeof enrollActivitySchema>;
