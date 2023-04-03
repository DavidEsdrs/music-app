import { songsRepository } from "../../../repositories/typeorm/mysql/TypeormSongsRepository";
import { TypeormTagSongRepository } from "../../../repositories/typeorm/mysql/TypeormTagRepository";
import { FFmpegFileHandling } from "../../../utils/fileHandling/FFmpegFileHandling";
import { CreateSongController } from "./CreateSongController";
import { CreateSongService } from "./CreateSongService"

export const buildCreateSong = () => {
    const fileHandling = new FFmpegFileHandling();
    const service = new CreateSongService(songsRepository, TypeormTagSongRepository, fileHandling);
    const controller = new CreateSongController(service);
    return controller;
}