import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository";
import { FFmpegFileHandling } from "../../../utils/fileHandling/FFmpegFileHandling";
import { GetSongsFromPlaylistService } from "./GetSongsFromPlaylist"
import { GetSongsFromPlaylistController } from "./GetSongsFromPlaylistController";

export const buildGetSongsFromPlaylist = () => {
    const ffmpegFileHandler = new FFmpegFileHandling();
    const service = new GetSongsFromPlaylistService(TypeormPlaylistsRepository, ffmpegFileHandler);
    const controller = new GetSongsFromPlaylistController(service);
    return controller;
}