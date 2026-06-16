import { z } from "zod";
export const createProductSchema = z.object({
    name: z.string().min(3, "O nome do produto deve ter no minimo 3 caracteres."),
    price: z.number().positive("O preco do produto deve ser positivo."),
    categoryId: z.uuid("O ID da categoria deve ser um UUID valido.")
});
export const productQuerySchema = z.object({
    category: z.uuid("O filtro de categoria deve ser um UUID valido.").optional()
});
export const productParamsSchema = z.object({
    id: z.uuid("O ID do produto deve ser um UUID valido.")
});
