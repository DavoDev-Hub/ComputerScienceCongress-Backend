import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        correo: string;
        role: "alumno" | "admin";
      } & JwtPayload;
    }
  }
}
