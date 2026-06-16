import { Role } from "../enums/Role"

export class User {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public role: Role
  ) {}
}