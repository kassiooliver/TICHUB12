import { z } from "zod"

export const createProductSchema = z.object({
  name: z.string().min(3, "O nome do produto deve ter no minimo 3 caracteres."),
  price: z.coerce.number().positive("O preco do produto deve ser positivo."),
  stock: z.coerce.number().int().nonnegative("O estoque do produto nao pode ser negativo."),
  categoryId: z.uuid("O ID da categoria deve ser um UUID valido.")
})

export const productQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  size: z.coerce.number().int().positive().max(100).default(10)
})

export const productParamsSchema = z.object({
  id: z.uuid("O ID do produto deve ser um UUID valido.")
})

export const updateProductSchema = createProductSchema.partial().refine(data => Object.keys(data).length > 0, {
  message: "Informe ao menos um campo para atualizar."
})
