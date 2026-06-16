import { CreateProductDto, ProductListDto, ProductResponseDto, UpdateProductDto } from "../dtos/product.dto.js";
export class ProductController {
    constructor(productService) {
        this.productService = productService;
        this.getAll = async (_req, res, next) => {
            try {
                const { page, size } = res.locals.query;
                const products = await this.productService.getAll(page, size);
                return res.status(200).json(ProductListDto.create(products, page, size));
            }
            catch (error) {
                return next(error);
            }
        };
        this.getById = async (req, res, next) => {
            try {
                const { id } = res.locals.params;
                const product = await this.productService.getById(id);
                return res.status(200).json(ProductResponseDto.create(product));
            }
            catch (error) {
                return next(error);
            }
        };
        this.create = async (req, res, next) => {
            try {
                const dto = CreateProductDto.create(req.body);
                const product = await this.productService.create(dto);
                return res.status(201).json(ProductResponseDto.create(product));
            }
            catch (error) {
                return next(error);
            }
        };
        this.update = async (req, res, next) => {
            try {
                const { id } = res.locals.params;
                const dto = UpdateProductDto.create(req.body);
                const product = await this.productService.update(id, dto);
                return res.status(200).json(ProductResponseDto.create(product));
            }
            catch (error) {
                return next(error);
            }
        };
        this.delete = async (req, res, next) => {
            try {
                const { id } = res.locals.params;
                await this.productService.delete(id);
                return res.status(204).send();
            }
            catch (error) {
                return next(error);
            }
        };
    }
}
