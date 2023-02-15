import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository"
import { songsRepository } from "../../../repositories/typeorm/mysql/TypeormSongsRepository"
import { DonwloadSongController } from "./DonwloadSongController";
import { DownloadSongService } from "./DownloadSongService"

export const buildDonwloadSong = () => {
    const service = new DownloadSongService(songsRepository, TypeormPlaylistsRepository);
    const controller = new DonwloadSongController(service);
    return controller;
}