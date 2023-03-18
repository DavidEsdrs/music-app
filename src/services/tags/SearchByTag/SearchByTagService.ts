import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { ITagRepository } from "../../../repositories/TagRepository";
import { ISearchByTagDTO } from "./SearchByTagDTO";
import { cleanObj } from "../../../utils/cleanObj";

export class SearchByTagService {
    constructor(
        private tagsRepository: ITagRepository
    ) {}

    async execute({ tag, user_id, limit = 20 }: ISearchByTagDTO) {
        const songsAndPlaylists = await this.tagsRepository.findSongAndPlaylistByTag(tag);
        return songsAndPlaylists.map(cleanObj);
    }
}