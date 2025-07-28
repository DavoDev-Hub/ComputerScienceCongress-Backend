import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ error: "No autenticado. Token no encontrado." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Token inválido o expirado." });
    }
};


