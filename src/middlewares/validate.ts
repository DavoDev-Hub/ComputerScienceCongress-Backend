import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validate =
    (schema: ZodSchema) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                const parsed = schema.parse(req.body);
                req.body = parsed;
                next();
            } catch (err) {
                if (err instanceof ZodError) {
                    return res.status(400).json({
                        error: "Datos inválidos",
                        details: err.errors,
                    });
                }

                return res.status(500).json({
                    error: "Error interno en la validación",
                });
            }
        };

