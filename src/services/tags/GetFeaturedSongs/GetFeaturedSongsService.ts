import { ITagSongRepository, SongAndPlaylist } from "../../../repositories/TagRepository";
import { TagSongOrPlaylist } from "../../../repositories/typeorm/mysql/TypeormTagRepository";
import { cleanObj } from "../../../utils/cleanObj";
import { IGetFeaturedSongsDTO } from "./GetFeaturedSongsDTO";

export class GetFeaturedSongsService {
    constructor(
        private tagsRepository: ITagSongRepository
    ) {}

    async execute({ song_id }: IGetFeaturedSongsDTO) {
        const songTags = await this.tagsRepository.getTagsFromSong(song_id);
        const tagsUsageCount = await this.tagsRepository.countTagByUsage(songTags);
        const mostUsedTag = tagsUsageCount.reduce((mostUsed, current) =>
            current.tag_type === "genre" && current.quantity > mostUsed.quantity ? current : mostUsed
        );
        const relatedByMostUsedTag = await this.tagsRepository.findSongAndPlaylistByTags([mostUsedTag.name], 10);
        const uniqueSongsAndPlaylists  = this.removeDuplicates(relatedByMostUsedTag);
        return cleanObj(uniqueSongsAndPlaylists) as TagSongOrPlaylist;
    }

    removeDuplicates(songsAndPlaylists: TagSongOrPlaylist) {
        const uniqueSongsAndPlaylists: TagSongOrPlaylist = {
            songs: [],
            playlists: []
        };
        
        songsAndPlaylists.songs.forEach((song) => {
            if (!uniqueSongsAndPlaylists.songs.some((s) => s.song_idSong === song.song_idSong)) {
              uniqueSongsAndPlaylists.songs.push(song);
            }
        });
      
        songsAndPlaylists.playlists.forEach((playlist) => {
            if (!uniqueSongsAndPlaylists.playlists.some((p) => p.playlist_idPlaylist === playlist.playlist_idPlaylist)) {
                uniqueSongsAndPlaylists.playlists.push(playlist);
            }
        });

        return uniqueSongsAndPlaylists;
    }
}