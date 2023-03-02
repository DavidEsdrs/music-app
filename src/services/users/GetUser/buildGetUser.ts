import { TypeormUsersRepository } from "../../../repositories/typeorm/mysql/TypeormUsersRepository"
import { GetUserController } from "./GetUserController";
import { GetUserService } from "./GetUserService"

export const buildGetUser = () => {
    const service = new GetUserService(TypeormUsersRepository);
    const controller = new GetUserController(service);
    return controller;
}