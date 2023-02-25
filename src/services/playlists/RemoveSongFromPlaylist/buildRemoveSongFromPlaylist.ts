import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository"
import { RemoveSongFromPlaylist } from "./RemoveSongFromPlaylist"
import { RemoveSongFromPlaylistController } from "./RemoveSongFromPlaylistController";

export const buildRemoveSongFromPlaylist = () => {
    const service = new RemoveSongFromPlaylist(TypeormPlaylistsRepository);
    const controller = new RemoveSongFromPlaylistController(service);
    return controller;
}