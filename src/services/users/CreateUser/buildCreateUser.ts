import { TypeormUsersRepository } from "../../../repositories/typeorm/mysql/TypeormUsersRepository"
import { CreateUserController } from "./CreateUserController";
import { CreateUserService } from "./CreateUserService"

export const buildCreateUser = () => {
    const service = new CreateUserService(TypeormUsersRepository);
    const controller = new CreateUserController(service);
    return controller;
}