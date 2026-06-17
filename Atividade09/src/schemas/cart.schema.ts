import { z } from "zod"

export const cartProductParamsSchema = z.object({
  productId: z.uuid("O ID do produto deve ser um UUID valido.")
})

export const addCartItemSchema = z.object({
  productId: z.uuid("O ID do produto deve ser um UUID valido."),
  quantity: z.coerce.number().int().positive("A quantidade deve ser positiva.").default(1)
})

export const updateCartItemSchema = z.object({
  quantity: z.coerce.number().int().positive("A quantidade deve ser positiva.")
})
