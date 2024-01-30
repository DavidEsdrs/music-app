import { 
    TypeormTagPlaylistRepository, 
    TypeormTagSongRepository 
} from "../../../repositories/typeorm/mysql/TypeormTagRepository"
import { CreateTagController } from "./CreateTagController";
import { CreateTagService } from "./CreateTagService"

export const buildCreateTag = () => {
    const service = new CreateTagService(TypeormTagPlaylistRepository, TypeormTagSongRepository);
    const controller = new CreateTagController(service);
    return controller;
}