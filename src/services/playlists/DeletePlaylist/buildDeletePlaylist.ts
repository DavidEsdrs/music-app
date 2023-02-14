import { PlaylistUser } from "../../../entities/PlaylistUser";
import { SongPlaylist } from "../../../entities/SongPlaylist";
import AppDataSource from "../../../ormconfig";
import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository";
import { typeormPlaylistUserRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistUser";
import { typeormSongPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormSongPlaylistRepository";
import { DeletePlaylistController } from "./DeletePlaylistController";
import { DeletePlaylistService } from "./DeletePlaylistService"

export const buildDeletePlaylist = () => {
    const service = new DeletePlaylistService(
        TypeormPlaylistsRepository,
        typeormSongPlaylistsRepository,
        typeormPlaylistUserRepository
    );
    const controller = new DeletePlaylistController(service);
    return controller;
}