import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import rateLimit from "express-rate-limit";

export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(401)
      .json({ error: "No autenticado. Token no encontrado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "id" in decoded &&
      "correo" in decoded &&
      "role" in decoded &&
      decoded.role === "admin"
    ) {
      req.user = decoded as {
        id: number;
        correo: string;
        role: "admin";
      } & JwtPayload;

      return next();
    }

    return res
      .status(403)
      .json({ error: "Token inválido o sin permisos de administrador." });
  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado." });
  }
};

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Demasiados intentos, intenta más tarde",
});
