import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository"
import { TypeormTagRepository } from "../../../repositories/typeorm/mysql/TypeormTagRepository";
import { CreatePlaylistController } from "./CreatePlaylistController";
import { CreatePlaylistService } from "./CreatePlaylistService"

export const buildCreatePlaylist = () => {
    const service = new CreatePlaylistService(TypeormPlaylistsRepository, TypeormTagRepository);
    const controller = new CreatePlaylistController(service);
    return controller;
}