import { TypeormPlaylistsRepository as playlistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository";
import { typeormPlaylistUserRepository as playlistUserRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistUser";
import { typeormSongPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormSongPlaylistRepository";
import { songsRepository } from "../../../repositories/typeorm/mysql/TypeormSongsRepository";
import { typeormSongUserRepository as songUserRepository } from "../../../repositories/typeorm/mysql/TypeormSongUserRepository";
import { AddSongToPlaylistService } from "../../playlists/AddSongToPlaylist/AddSongToPlaylistService";
import { CreateSongController } from "./CreateSongController";
import { CreateSongService } from "./CreateSongService"

export const buildCreateSong = () => {
    const addSongToPlaylist = new AddSongToPlaylistService(typeormSongPlaylistsRepository, playlistsRepository);
    const service = new CreateSongService({
        addSongToPlaylist,
        playlistsRepository,
        playlistUserRepository,
        songsRepository,
        songUserRepository
    });
    const controller = new CreateSongController(service);
    return controller;
}