import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository"
import { typeormPlaylistUserRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistUser"
import { AddPlaylistToUserController } from "./AddPlaylistToUserController";
import { AddPlaylistToUserService } from "./AddPlaylistToUserService"

export const buildAddPlaylistToUser = () => {
    const service = new AddPlaylistToUserService(TypeormPlaylistsRepository, typeormPlaylistUserRepository);
    const controller = new AddPlaylistToUserController(service);
    return controller;
}