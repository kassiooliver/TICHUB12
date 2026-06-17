import { AddCartItemDto, CartItemResponseDto, CartResponseDto, UpdateCartItemDto } from "../dtos/cart.dto.js";
import { AppError } from "../errors/AppError.js";
import { addCartItemSchema, cartProductParamsSchema, updateCartItemSchema } from "../schemas/cart.schema.js";
export class CartController {
    constructor(cartService) {
        this.cartService = cartService;
        this.getCart = async (req, res, next) => {
            try {
                const userId = this.getUserId(req);
                const items = await this.cartService.getCart(userId);
                return res.status(200).json(CartResponseDto.create(items));
            }
            catch (error) {
                return next(error);
            }
        };
        this.addItem = async (req, res, next) => {
            try {
                const userId = this.getUserId(req);
                const data = addCartItemSchema.parse(req.body);
                const item = await this.cartService.addItem(userId, AddCartItemDto.create(data));
                return res.status(201).json(item ? CartItemResponseDto.create(item) : null);
            }
            catch (error) {
                return next(error);
            }
        };
        this.updateItem = async (req, res, next) => {
            try {
                const userId = this.getUserId(req);
                const { productId } = cartProductParamsSchema.parse(req.params);
                const data = updateCartItemSchema.parse(req.body);
                const item = await this.cartService.updateItem(userId, productId, UpdateCartItemDto.create(data));
                return res.status(200).json(CartItemResponseDto.create(item));
            }
            catch (error) {
                return next(error);
            }
        };
        this.removeItem = async (req, res, next) => {
            try {
                const userId = this.getUserId(req);
                const { productId } = cartProductParamsSchema.parse(req.params);
                await this.cartService.removeItem(userId, productId);
                return res.status(204).send();
            }
            catch (error) {
                return next(error);
            }
        };
        this.clearCart = async (req, res, next) => {
            try {
                const userId = this.getUserId(req);
                await this.cartService.clearCart(userId);
                return res.status(204).send();
            }
            catch (error) {
                return next(error);
            }
        };
    }
    getUserId(req) {
        if (!req.user?.id) {
            throw new AppError("Token invalido.", 401);
        }
        return req.user.id;
    }
}
