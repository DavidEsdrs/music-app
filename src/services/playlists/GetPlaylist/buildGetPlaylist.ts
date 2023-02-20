import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository";
import { GetPlaylistController } from "./GetPlaylistController";
import { GetPlaylistService } from "./GetPlaylistService"

export const buildGetPlaylist = () => {
    const service = new GetPlaylistService(TypeormPlaylistsRepository);
    const controller = new GetPlaylistController(service);
    return controller;
}