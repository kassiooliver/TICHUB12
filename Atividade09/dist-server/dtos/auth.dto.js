export class RegisterUserDto {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
    static create(data) {
        return new RegisterUserDto(data.username, data.email, data.password);
    }
}
export class LoginUserDto {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    static create(data) {
        return new LoginUserDto(data.email, data.password);
    }
}
export class UserResponseDto {
    constructor(id, username, email, role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
    }
    static create(user) {
        return new UserResponseDto(user.id, user.username, user.email, user.role);
    }
}
export class AuthResponseDto {
    constructor(user, token) {
        this.user = user;
        this.token = token;
    }
    static create(user, token) {
        return new AuthResponseDto(UserResponseDto.create(user), token);
    }
}
