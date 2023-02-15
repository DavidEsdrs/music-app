import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository"
import { AddPlaylistToUserController } from "./AddPlaylistToUserController";
import { AddPlaylistToUserService } from "./AddPlaylistToUserService"

export const buildAddPlaylistToUser = () => {
    const service = new AddPlaylistToUserService(TypeormPlaylistsRepository);
    const controller = new AddPlaylistToUserController(service);
    return controller;
}