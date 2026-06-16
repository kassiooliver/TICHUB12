import { NextFunction, Request, Response } from "express"
import { ZodError } from "zod"
import { AppError } from "../errors/AppError.js"

type DatabaseError = Error & {
  code?: string
}

export function errorMiddleware(error: Error, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message })
  }

  if (error instanceof ZodError) {
    return res.status(400).json(error.format())
  }

  const databaseError = error as DatabaseError

  if (databaseError.code === "23503") {
    return res.status(409).json({ message: "Registro relacionado impede esta operacao." })
  }

  return res.status(500).json({ message: "Erro interno do servidor." })
}
