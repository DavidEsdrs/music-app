import { TypeormTagRepository } from "../../../repositories/typeorm/mysql/TypeormTagRepository";
import { GetFeaturedSongsController } from "./GetFeaturedSongsController";
import { GetFeaturedSongsService } from "./GetFeaturedSongsService"

export const buildGetFeaturedSongs = () => {
    const service = new GetFeaturedSongsService(TypeormTagRepository);
    const controller = new GetFeaturedSongsController(service);
    return controller;
}