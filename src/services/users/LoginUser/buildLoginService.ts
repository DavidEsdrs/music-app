import { GenerateRefreshToken } from "../../../provider/GenerateRefreshToken";
import { TypeormRefreshTokenRepository } from "../../../repositories/typeorm/mysql/MySqlRefreshTokenRepository";
import { TypeormUsersRepository } from "../../../repositories/typeorm/mysql/TypeormUsersRepository"
import { LoginService } from "./LoginService"
import { LoginUserController } from "./LoginUserController";

export const buildLoginService = () => {
    const service = new LoginService(TypeormUsersRepository);
    const generateRefreshToken = new GenerateRefreshToken(TypeormRefreshTokenRepository);
    const controller = new LoginUserController(service, generateRefreshToken);
    return controller;
}