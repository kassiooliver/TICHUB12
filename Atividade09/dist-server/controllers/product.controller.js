import { CreateProductDto, ProductListDto, ProductResponseDto, UpdateProductDto } from "../dtos/product.dto.js";
import { createProductSchema, productParamsSchema, productQuerySchema, updateProductSchema } from "../schemas/product.schema.js";
export class ProductController {
    constructor(productService) {
        this.productService = productService;
        this.getAll = async (req, res, next) => {
            try {
                const { page, size } = productQuerySchema.parse(req.query);
                const products = await this.productService.getAll(page, size);
                return res.status(200).json(ProductListDto.create(products, page, size));
            }
            catch (error) {
                return next(error);
            }
        };
        this.getById = async (req, res, next) => {
            try {
                const { id } = productParamsSchema.parse(req.params);
                const product = await this.productService.getById(id);
                return res.status(200).json(ProductResponseDto.create(product));
            }
            catch (error) {
                return next(error);
            }
        };
        this.create = async (req, res, next) => {
            try {
                const data = createProductSchema.parse(req.body);
                const dto = CreateProductDto.create(data);
                const product = await this.productService.create(dto);
                return res.status(201).json(ProductResponseDto.create(product));
            }
            catch (error) {
                return next(error);
            }
        };
        this.update = async (req, res, next) => {
            try {
                const { id } = productParamsSchema.parse(req.params);
                const data = updateProductSchema.parse(req.body);
                const dto = UpdateProductDto.create(data);
                const product = await this.productService.update(id, dto);
                return res.status(200).json(ProductResponseDto.create(product));
            }
            catch (error) {
                return next(error);
            }
        };
        this.delete = async (req, res, next) => {
            try {
                const { id } = productParamsSchema.parse(req.params);
                await this.productService.delete(id);
                return res.status(204).send();
            }
            catch (error) {
                return next(error);
            }
        };
    }
}
