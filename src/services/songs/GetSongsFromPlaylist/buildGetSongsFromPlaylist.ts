import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository";
import { GetSongsFromPlaylistService } from "./GetSongsFromPlaylist"
import { GetSongsFromPlaylistController } from "./GetSongsFromPlaylistController";

export const buildGetSongsFromPlaylist = () => {
    const service = new GetSongsFromPlaylistService(TypeormPlaylistsRepository);
    const controller = new GetSongsFromPlaylistController(service);
    return controller;
}