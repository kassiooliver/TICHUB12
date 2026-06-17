import { AuthResponseDto, LoginUserDto, RegisterUserDto } from "../dtos/auth.dto.js";
import { loginUserSchema, registerUserSchema } from "../schemas/auth.schema.js";
export class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.register = async (req, res, next) => {
            try {
                const data = registerUserSchema.parse(req.body);
                const dto = RegisterUserDto.create(data);
                const { user, token } = await this.authService.register(dto);
                return res.status(201).json(AuthResponseDto.create(user, token));
            }
            catch (error) {
                return next(error);
            }
        };
        this.login = async (req, res, next) => {
            try {
                const data = loginUserSchema.parse(req.body);
                const dto = LoginUserDto.create(data);
                const { user, token } = await this.authService.login(dto);
                return res.status(200).json(AuthResponseDto.create(user, token));
            }
            catch (error) {
                return next(error);
            }
        };
    }
}
