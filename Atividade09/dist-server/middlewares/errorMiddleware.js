import { ZodError } from "zod";
import { AppError } from "../errors/AppError.js";
export function errorMiddleware(error, _req, res, _next) {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    if (error instanceof ZodError) {
        return res.status(400).json(error.format());
    }
    const databaseError = error;
    if (databaseError.code === "23505") {
        return res.status(409).json({ message: "Registro ja cadastrado." });
    }
    if (databaseError.code === "23503") {
        return res.status(409).json({ message: "Registro relacionado impede esta operacao." });
    }
    return res.status(500).json({ message: "Erro interno do servidor." });
}
