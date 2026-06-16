import { NextFunction, Request, Response } from "express"
import { ZodType } from "zod"

type RequestSource = "body" | "params" | "query"

export function validateData(schema: ZodType, source: RequestSource = "body") {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source])

    if (!result.success) {
      return res.status(400).json(result.error.format())
    }

    res.locals[source] = result.data

    if (source !== "query") {
      req[source] = result.data
    }

    return next()
  }
}
