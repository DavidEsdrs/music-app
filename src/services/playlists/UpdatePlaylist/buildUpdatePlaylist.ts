import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository"
import { UpdatePlaylistController } from "./UpdatePlaylistController";
import { UpdatePlaylistService } from "./UpdatePlaylistService"

export const buildUpdatePlaylist = () => {
    const service = new UpdatePlaylistService(TypeormPlaylistsRepository);
    const controller = new UpdatePlaylistController(service);
    return controller;
}