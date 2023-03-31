import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository"
import { TypeormTagPlaylistRepository } from "../../../repositories/typeorm/mysql/TypeormTagRepository";
import { CreatePlaylistController } from "./CreatePlaylistController";
import { CreatePlaylistService } from "./CreatePlaylistService"

export const buildCreatePlaylist = () => {
    const service = new CreatePlaylistService(TypeormPlaylistsRepository, TypeormTagPlaylistRepository);
    const controller = new CreatePlaylistController(service);
    return controller;
}