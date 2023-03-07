import { songsRepository } from "../../../repositories/typeorm/mysql/TypeormSongsRepository"
import { FFmpegFileHandling } from "../../../utils/fileHandling/FFmpegFileHandling";
import { GetSongController } from "./GetSongController";
import { GetSongService } from "./GetSongService"

export const buildGetSong = () => {
    const ffmpegFileHandler = new FFmpegFileHandling();
    const service = new GetSongService(songsRepository, ffmpegFileHandler);
    const controller = new GetSongController(service);
    return controller;
}