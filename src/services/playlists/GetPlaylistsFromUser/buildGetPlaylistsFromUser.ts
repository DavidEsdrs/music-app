import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository";
import { typeormPlaylistUserRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistUser";
import { GetPlaylistsFromUserController } from "./GetPlaylistsFromUserController";
import { GetPlaylistsFromUserService } from "./GetPlaylistsFromUserService"

export const buildGetPlaylistsFromUser = () => {
    const service = new GetPlaylistsFromUserService(TypeormPlaylistsRepository,typeormPlaylistUserRepository);
    const controller = new GetPlaylistsFromUserController(service);
    return controller;
}