import { CategoryListDto, CategoryResponseDto, CreateCategoryDto, UpdateCategoryDto } from "../dtos/category.dto.js";
export class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
        this.getAll = async (_req, res, next) => {
            try {
                const { page, size } = res.locals.query;
                const categories = await this.categoryService.getAll(page, size);
                return res.status(200).json(CategoryListDto.create(categories, page, size));
            }
            catch (error) {
                return next(error);
            }
        };
        this.getById = async (req, res, next) => {
            try {
                const { id } = res.locals.params;
                const category = await this.categoryService.getById(id);
                return res.status(200).json(CategoryResponseDto.create(category));
            }
            catch (error) {
                return next(error);
            }
        };
        this.create = async (req, res, next) => {
            try {
                const dto = CreateCategoryDto.create(req.body);
                const category = await this.categoryService.create(dto);
                return res.status(201).json(CategoryResponseDto.create(category));
            }
            catch (error) {
                return next(error);
            }
        };
        this.update = async (req, res, next) => {
            try {
                const { id } = res.locals.params;
                const dto = UpdateCategoryDto.create(req.body);
                const category = await this.categoryService.update(id, dto);
                return res.status(200).json(CategoryResponseDto.create(category));
            }
            catch (error) {
                return next(error);
            }
        };
        this.delete = async (req, res, next) => {
            try {
                const { id } = res.locals.params;
                await this.categoryService.delete(id);
                return res.status(204).send();
            }
            catch (error) {
                return next(error);
            }
        };
    }
}
