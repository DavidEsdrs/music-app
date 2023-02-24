import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository";
import { FFmpegFileHandling } from "../../../utils/fileHandling/FileHandling";
import { GetSongsFromPlaylistService } from "./GetSongsFromPlaylist"
import { GetSongsFromPlaylistController } from "./GetSongsFromPlaylistController";

export const buildGetSongsFromPlaylist = () => {
    const service = new GetSongsFromPlaylistService(TypeormPlaylistsRepository, new FFmpegFileHandling());
    const controller = new GetSongsFromPlaylistController(service);
    return controller;
}