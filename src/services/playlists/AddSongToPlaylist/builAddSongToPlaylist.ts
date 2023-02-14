import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository"
import { typeormSongPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormSongPlaylistRepository"
import { AddSongToPlaylistController } from "./AddSongToPlaylistController";
import { AddSongToPlaylistService } from "./AddSongToPlaylistService"

export const buildAddSongToPlaylist = () => {
    const service = new AddSongToPlaylistService(typeormSongPlaylistsRepository, TypeormPlaylistsRepository);
    const controller = new AddSongToPlaylistController(service);
    return controller;
}