import { PlaylistUser } from "../../../entities/PlaylistUser";
import AppDataSource from "../../../ormconfig";
import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository"
import { CreatePlaylistController } from "./CreatePlaylistController";
import { CreatePlaylistService } from "./CreatePlaylistService"

export const buildCreatePlaylist = () => {
    const service = new CreatePlaylistService(
        TypeormPlaylistsRepository, 
        AppDataSource.getRepository(PlaylistUser)
    );
    const controller = new CreatePlaylistController(service);
    return controller;
}