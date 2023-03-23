import { Playlist } from "../../../entities/Playlist";
import { Song } from "../../../entities/Song";
import { Tag } from "../../../entities/Tag";
import { ITagRepository, SongAndPlaylist } from "../../../repositories/TagRepository";
import { TagSongOrPlaylist } from "../../../repositories/typeorm/mysql/TypeormTagRepository";
import { cleanObj } from "../../../utils/cleanObj";
import { IGetFeaturedSongsDTO } from "./GetFeaturedSongsDTO";

export class GetFeaturedSongsService {
    constructor(
        private tagsRepository: ITagRepository
    ) {}

    async execute({ song_id }: IGetFeaturedSongsDTO) {
        const songTags = await this.tagsRepository.getTagsFromSong(song_id);
        const tagsUsageCount = await this.tagsRepository.countTagByUsage(songTags);
        const tagsName = tagsUsageCount.map((t: Tag) => t.name);
        const relatedByMostUsedTag = await this.tagsRepository.findSongAndPlaylistByTags(tagsName, 10);
        const obj: TagSongOrPlaylist = {
            songs: [],
            playlists: []
        };
        relatedByMostUsedTag.songs.forEach(song => !obj.songs.find(us => us.song_idSong === song.song_idSong) && obj.songs.push(song));
        relatedByMostUsedTag.playlists.forEach(playlist => !obj.playlists.find(up => up.playlist_idPlaylist === playlist.playlist_idPlaylist) && obj.playlists.push(playlist));
        return cleanObj(obj) as TagSongOrPlaylist;
    }
}