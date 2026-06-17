import { z } from "zod"

export const registerUserSchema = z.object({
  username: z.string().min(3, "O nome deve ter no minimo 3 caracteres."),
  email: z.email("E-mail invalido."),
  password: z.string().min(6, "A senha deve ter no minimo 6 caracteres.")
})

export const loginUserSchema = z.object({
  email: z.email("E-mail invalido."),
  password: z.string().min(6, "A senha deve ter no minimo 6 caracteres.")
})
