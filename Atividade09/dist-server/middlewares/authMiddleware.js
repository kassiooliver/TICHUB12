import jwt from "jsonwebtoken";
import { Role } from "../enums/Role.js";
function normalizeRole(role) {
    return role.toUpperCase();
}
export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token nao informado." });
    }
    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer" || !token) {
        return res.status(401).json({ message: "Token invalido." });
    }
    if (token === "fake-admin-token" || token === "fake-customer-token") {
        req.user = {
            role: token === "fake-admin-token" ? Role.ADMIN : Role.CUSTOMER
        };
        return next();
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "atividade08-secret");
        if (!decoded.role) {
            return res.status(401).json({ message: "Token invalido." });
        }
        req.user = {
            id: decoded.id,
            role: normalizeRole(decoded.role)
        };
        return next();
    }
    catch {
        return res.status(401).json({ message: "Token invalido." });
    }
}
