import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository";
import { TypeormUsersRepository } from "../../../repositories/typeorm/mysql/TypeormUsersRepository"
import { CreateUserController } from "./CreateUserController";
import { CreateUserService } from "./CreateUserService"

export const buildCreateUser = () => {
    const service = new CreateUserService({
        usersRepository: TypeormUsersRepository, 
        playlistsRepository: TypeormPlaylistsRepository
    });
    const controller = new CreateUserController(service);
    return controller;
}