import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository";
import { GetPlaylistsFromUserController } from "./GetPlaylistsFromUserController";
import { GetPlaylistsFromUserService } from "./GetPlaylistsFromUserService"

export const buildGetPlaylistsFromUser = () => {
    const service = new GetPlaylistsFromUserService(TypeormPlaylistsRepository);
    const controller = new GetPlaylistsFromUserController(service);
    return controller;
}