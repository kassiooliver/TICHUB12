import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto"
import jwt from "jsonwebtoken"
import { LoginUserDto, RegisterUserDto } from "../dtos/auth.dto.js"
import { User } from "../entities/User.js"
import { AppError } from "../errors/AppError.js"
import { UserRepository } from "../repositories/UserRepository.js"

const jwtSecret = process.env.JWT_SECRET ?? "atividade09-secret"

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(dto: RegisterUserDto) {
    const existingUser = await this.userRepository.getUserByEmail(dto.email)

    if (existingUser) {
      throw new AppError("E-mail ja cadastrado.", 409)
    }

    const user = User.create({
      username: dto.username,
      email: dto.email,
      passwordHash: this.hashPassword(dto.password)
    })

    const createdUser = await this.userRepository.createUser(user)
    const token = this.createToken(createdUser)

    return { user: createdUser, token }
  }

  async login(dto: LoginUserDto) {
    const user = await this.userRepository.getUserByEmail(dto.email)

    if (!user || !this.verifyPassword(dto.password, user.passwordHash)) {
      throw new AppError("Credenciais invalidas.", 401)
    }

    const token = this.createToken(user)

    return { user, token }
  }

  private hashPassword(password: string) {
    const salt = randomBytes(16).toString("hex")
    const hash = scryptSync(password, salt, 64).toString("hex")
    return `${salt}:${hash}`
  }

  private verifyPassword(password: string, passwordHash: string) {
    const [salt, storedHash] = passwordHash.split(":")

    if (!salt || !storedHash) {
      return false
    }

    const hash = scryptSync(password, salt, 64)
    const stored = Buffer.from(storedHash, "hex")

    if (hash.length !== stored.length) {
      return false
    }

    return timingSafeEqual(hash, stored)
  }

  private createToken(user: User) {
    const tokenId = createHash("sha256").update(user.id).digest("hex")
    return jwt.sign({ id: user.id, sub: tokenId, role: user.role }, jwtSecret, { expiresIn: "1d" })
  }
}
