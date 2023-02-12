import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository"
import { GetOnePlaylistController } from "./GetOnePlaylistController";
import { GetOnePLaylistService } from "./GetOnePlaylistService"

export const buildGetOnePLaylist = () => {
    const service = new GetOnePLaylistService(TypeormPlaylistsRepository);
    const controller = new GetOnePlaylistController(service);
    return controller;
}