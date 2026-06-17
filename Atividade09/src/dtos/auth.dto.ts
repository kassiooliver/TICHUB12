import { User } from "../entities/User.js"
import { Role } from "../enums/Role.js"

export class RegisterUserDto {
  private constructor(
    public readonly username: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(data: { username: string; email: string; password: string }) {
    return new RegisterUserDto(data.username, data.email, data.password)
  }
}

export class LoginUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(data: { email: string; password: string }) {
    return new LoginUserDto(data.email, data.password)
  }
}

export class UserResponseDto {
  private constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly email: string,
    public readonly role: Role
  ) {}

  static create(user: User) {
    return new UserResponseDto(user.id, user.username, user.email, user.role)
  }
}

export class AuthResponseDto {
  private constructor(
    public readonly user: UserResponseDto,
    public readonly token: string
  ) {}

  static create(user: User, token: string) {
    return new AuthResponseDto(UserResponseDto.create(user), token)
  }
}
