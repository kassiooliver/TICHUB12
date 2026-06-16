import { NextFunction, Request, Response } from "express"
import { Role } from "../enums/Role.js"

export function authorize(role: Role) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Token nao informado." })
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: "Acesso negado." })
    }

    return next()
  }
}
