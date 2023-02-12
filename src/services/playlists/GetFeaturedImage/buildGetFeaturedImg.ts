import { TypeormPlaylistsRepository } from "../../../repositories/typeorm/mysql/TypeormPlaylistsRepository"
import { GetFeaturedImgController } from "./GetFeaturedImgController";
import { GetFeaturedImgService } from "./GetFeaturedImgService"

export const buildGetFeaturedImg = () => {
    const service = new GetFeaturedImgService(TypeormPlaylistsRepository);
    const controller = new GetFeaturedImgController(service);
    return controller;
}