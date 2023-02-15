import { TypeormPlaylistsRepository as playlistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository";
import { songsRepository } from "../../../repositories/typeorm/mysql/TypeormSongsRepository";
import { AddSongToPlaylistService } from "../../playlists/AddSongToPlaylist/AddSongToPlaylistService";
import { CreateSongController } from "./CreateSongController";
import { CreateSongService } from "./CreateSongService"

export const buildCreateSong = () => {
    const service = new CreateSongService(songsRepository);
    const controller = new CreateSongController(service);
    return controller;
}