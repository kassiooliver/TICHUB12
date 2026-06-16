import { z } from "zod";
export const categoryQueryPaginationSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    size: z.coerce.number().int().positive().max(100).default(10)
});
export const categoryParamsSchema = z.object({
    id: z.uuid("O ID da categoria deve ser um UUID valido.")
});
export const createCategorySchema = z.object({
    name: z.string().min(3, "O nome da categoria deve ter no minimo 3 caracteres.")
});
export const updateCategorySchema = createCategorySchema;
