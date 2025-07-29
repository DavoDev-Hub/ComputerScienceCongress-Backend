import { JwtPayload } from "jsonwebtoken"
import session from "express-session"

declare global {
    namespace Express {
        interface Request {
            user?: string | JwtPayload
            session: session.Session & Partial<session.SessionData>
        }
    }
}

export { };
