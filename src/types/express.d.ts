import { JwtPayload } from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            user?: string | JwtPayload;
            session: Session & Partial<SessionData>
        }
    }
}

export { };
