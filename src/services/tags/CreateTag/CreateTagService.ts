import { DuplicateTagError } from "../../../api/APIErrors";
import { ITagRepository } from "../../../repositories/TagRepository";
import { ICreateTagDTO } from "./CreateTagDTO";

export class CreateTagService {
    constructor(
        private tagRepository: ITagRepository
    ) {}

    async execute({ name, playlist_id, song_id }: ICreateTagDTO) {
        const newTag = this.tagRepository.create({ name: name.trim().toLowerCase(), playlist_id, song_id });
        await this.tagRepository.save(newTag);
        return newTag;
    }
}