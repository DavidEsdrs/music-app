import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository"
import { DeletePlaylistsController } from "./DeletePlaylistController";
import { DeletePlaylistService } from "./DeletePlaylistsService"

export const buildDeletePlaylist = () => {
    const service = new DeletePlaylistService(TypeormPlaylistsRepository);
    const controller = new DeletePlaylistsController(service);
    return controller;
}