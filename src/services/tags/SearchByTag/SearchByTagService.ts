import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { ITagSongRepository, SongAndPlaylist } from "../../../repositories/TagRepository";
import { ISearchByTagDTO } from "./SearchByTagDTO";
import { cleanObj } from "../../../utils/cleanObj";

export class SearchByTagService {
    constructor(
        private tagsRepository: ITagSongRepository
    ) {}

    async execute({ tag, user_id, limit = 20 }: ISearchByTagDTO) {
        const songsAndPlaylists = await this.tagsRepository.findSongAndPlaylistByTag(tag, limit);
        return {
            songs: songsAndPlaylists.songs.map(cleanObj),
            playlists: songsAndPlaylists.playlists.map(cleanObj)
        } as SongAndPlaylist;
    }
}