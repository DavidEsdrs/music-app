import { TypeormPlaylistsRepository as playlistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository";
import { songsRepository } from "../../../repositories/typeorm/mysql/TypeormSongsRepository";
import { FFmpegFileHandling } from "../../../utils/fileHandling/FFmpegFileHandling";
import { AddSongToPlaylistService } from "../../playlists/AddSongToPlaylist/AddSongToPlaylistService";
import { CreateSongController } from "./CreateSongController";
import { CreateSongService } from "./CreateSongService"

export const buildCreateSong = () => {
    const fileHandling = new FFmpegFileHandling();
    const service = new CreateSongService(songsRepository, fileHandling);
    const controller = new CreateSongController(service);
    return controller;
}