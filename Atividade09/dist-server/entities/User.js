import { Role } from "../enums/Role.js";
export class User {
    constructor(id, username, email, passwordHash, role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
    }
    static create(data) {
        const username = data.username.trim();
        const email = data.email.trim().toLowerCase();
        if (username.length < 3) {
            throw new Error("O nome do usuario deve ter no minimo 3 caracteres.");
        }
        if (!email.includes("@")) {
            throw new Error("E-mail invalido.");
        }
        return new User(data.id ?? crypto.randomUUID(), username, email, data.passwordHash, data.role ?? Role.CUSTOMER);
    }
}
