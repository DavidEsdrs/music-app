import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository";
import { typeormPlaylistUserRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistUser";
import { TypeormUsersRepository } from "../../../repositories/typeorm/mysql/TypeormUsersRepository"
import { CreateUserController } from "./CreateUserController";
import { CreateUserService } from "./CreateUserService"

export const buildCreateUser = () => {
    const service = new CreateUserService({
        usersRepository: TypeormUsersRepository, 
        playlistsRepository: TypeormPlaylistsRepository, 
        playlistsUserRepository: typeormPlaylistUserRepository
    });
    const controller = new CreateUserController(service);
    return controller;
}