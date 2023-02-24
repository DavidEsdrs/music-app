import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository"
import { GetPlaylistsController } from "./GetPlaylistsController";
import { GetPlaylists } from "./GetPlaylistsService"

export const buildGetPlaylists = () => {
    const service = new GetPlaylists(TypeormPlaylistsRepository);
    const controller = new GetPlaylistsController(service);
    return controller;
}