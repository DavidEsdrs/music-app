import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository"
import { CreatePlaylistController } from "./CreatePlaylistController";
import { CreatePlaylistService } from "./CreatePlaylistService"

export const buildCreatePlaylist = () => {
    const service = new CreatePlaylistService(TypeormPlaylistsRepository);
    const controller = new CreatePlaylistController(service);
    return controller;
}