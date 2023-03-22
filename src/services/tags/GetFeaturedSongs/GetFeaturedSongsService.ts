import { ITagRepository, SongAndPlaylist } from "../../../repositories/TagRepository";
import { cleanObj } from "../../../utils/cleanObj";
import { IGetFeaturedSongsDTO } from "./GetFeaturedSongsDTO";

export class GetFeaturedSongsService {
    constructor(
        private tagsRepository: ITagRepository
    ) {}

    async execute({ song_id }: IGetFeaturedSongsDTO) {
        const songTags = await this.tagsRepository.getTagsFromSong(song_id);
        const tagsUsageCount = await this.tagsRepository.countTagByUsage(songTags);
        const relatedByMostUsedTag = await this.tagsRepository.findSongAndPlaylistByTag(tagsUsageCount[0].name, 10);
        return cleanObj(relatedByMostUsedTag) as SongAndPlaylist;
    }
}