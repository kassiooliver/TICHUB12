import { NextFunction, Request, Response } from "express"
import { AuthResponseDto, LoginUserDto, RegisterUserDto } from "../dtos/auth.dto.js"
import { loginUserSchema, registerUserSchema } from "../schemas/auth.schema.js"
import { AuthService } from "../services/AuthService.js"

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = registerUserSchema.parse(req.body)
      const dto = RegisterUserDto.create(data)
      const { user, token } = await this.authService.register(dto)

      return res.status(201).json(AuthResponseDto.create(user, token))
    } catch (error) {
      return next(error)
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = loginUserSchema.parse(req.body)
      const dto = LoginUserDto.create(data)
      const { user, token } = await this.authService.login(dto)

      return res.status(200).json(AuthResponseDto.create(user, token))
    } catch (error) {
      return next(error)
    }
  }
}
