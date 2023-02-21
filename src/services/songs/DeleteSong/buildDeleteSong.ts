import { songsRepository } from "../../../repositories/typeorm/mysql/TypeormSongsRepository"
import { DeleteSongController } from "./DeleteSongController";
import { DeleteSongService } from "./DeleteSongService"

export const buildDeleteSong = () => {
    const service = new DeleteSongService(songsRepository);
    const controller = new DeleteSongController(service);
    return controller;
}