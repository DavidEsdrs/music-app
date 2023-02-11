import { TypeormUsersRepository } from "../../../repositories/typeorm/mysql/TypeormUsersRepository"
import { LoginService } from "./LoginService"
import { LoginUserController } from "./LoginUserController";

export const buildLoginService = () => {
    const service = new LoginService(TypeormUsersRepository);
    const controller = new LoginUserController(service);
    return controller;
}