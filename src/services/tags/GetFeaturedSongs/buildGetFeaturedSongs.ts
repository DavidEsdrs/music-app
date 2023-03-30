import { TypeormTagSongRepository } from "../../../repositories/typeorm/mysql/TypeormTagRepository";
import { GetFeaturedSongsController } from "./GetFeaturedSongsController";
import { GetFeaturedSongsService } from "./GetFeaturedSongsService"

export const buildGetFeaturedSongs = () => {
    const service = new GetFeaturedSongsService(TypeormTagSongRepository);
    const controller = new GetFeaturedSongsController(service);
    return controller;
}