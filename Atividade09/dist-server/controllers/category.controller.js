import { CategoryListDto, CategoryResponseDto, CreateCategoryDto, UpdateCategoryDto } from "../dtos/category.dto.js";
import { categoryParamsSchema, categoryQueryPaginationSchema, createCategorySchema, updateCategorySchema } from "../schemas/category.schema.js";
export class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
        this.getAll = async (req, res, next) => {
            try {
                const { page, size } = categoryQueryPaginationSchema.parse(req.query);
                const categories = await this.categoryService.getAll(page, size);
                return res.status(200).json(CategoryListDto.create(categories, page, size));
            }
            catch (error) {
                return next(error);
            }
        };
        this.getById = async (req, res, next) => {
            try {
                const { id } = categoryParamsSchema.parse(req.params);
                const category = await this.categoryService.getById(id);
                return res.status(200).json(CategoryResponseDto.create(category));
            }
            catch (error) {
                return next(error);
            }
        };
        this.create = async (req, res, next) => {
            try {
                const data = createCategorySchema.parse(req.body);
                const dto = CreateCategoryDto.create(data);
                const category = await this.categoryService.create(dto);
                return res.status(201).json(CategoryResponseDto.create(category));
            }
            catch (error) {
                return next(error);
            }
        };
        this.update = async (req, res, next) => {
            try {
                const { id } = categoryParamsSchema.parse(req.params);
                const data = updateCategorySchema.parse(req.body);
                const dto = UpdateCategoryDto.create(data);
                const category = await this.categoryService.update(id, dto);
                return res.status(200).json(CategoryResponseDto.create(category));
            }
            catch (error) {
                return next(error);
            }
        };
        this.delete = async (req, res, next) => {
            try {
                const { id } = categoryParamsSchema.parse(req.params);
                await this.categoryService.delete(id);
                return res.status(204).send();
            }
            catch (error) {
                return next(error);
            }
        };
    }
}
