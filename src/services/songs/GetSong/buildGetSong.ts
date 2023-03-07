import { songsRepository } from "../../../repositories/typeorm/mysql/TypeormSongsRepository"
import { FFmpegFileHandling } from "../../../utils/fileHandling/FFmpegFileHandling";
import { GetSongController } from "./GetSongController";
import { GetSongService } from "./GetSongService"

export const buildGetSong = () => {
    const service = new GetSongService(songsRepository, new FFmpegFileHandling());
    const controller = new GetSongController(service);
    return controller;
}