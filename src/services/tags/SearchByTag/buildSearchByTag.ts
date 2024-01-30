import { TypeormTagSongRepository } from "../../../repositories/typeorm/mysql/TypeormTagRepository"
import { SearchByTagController } from "./SearchByTagController";
import { SearchByTagService } from "./SearchByTagService"

export const buildSearchByTag = () => {
    const service = new SearchByTagService(TypeormTagSongRepository);
    const controller = new SearchByTagController(service);
    return controller;
}