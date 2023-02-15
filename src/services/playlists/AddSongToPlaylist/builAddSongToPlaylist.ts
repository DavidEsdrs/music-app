import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository"
import { songsRepository } from "../../../repositories/typeorm/mysql/TypeormSongsRepository";
import { AddSongToPlaylistController } from "./AddSongToPlaylistController";
import { AddSongToPlaylistService } from "./AddSongToPlaylistService"

export const buildAddSongToPlaylist = () => {
    const service = new AddSongToPlaylistService(TypeormPlaylistsRepository, songsRepository);
    const controller = new AddSongToPlaylistController(service);
    return controller;
}