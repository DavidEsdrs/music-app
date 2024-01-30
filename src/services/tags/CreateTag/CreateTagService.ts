import { DuplicateTagError } from "../../../api/APIErrors";
import { ITagSongRepository, ITagPlaylistRepository } from "../../../repositories/TagRepository";
import { ICreateTagDTO } from "./CreateTagDTO";

export class CreateTagService {
    constructor(
        private tagPlaylistRepository: ITagPlaylistRepository,
        private tagSongRepository: ITagSongRepository,
    ) {}

    async execute({ name, playlist_id, song_id }: ICreateTagDTO) {
        const tagPlaylist = this.tagPlaylistRepository.create({ name: name.trim().toLowerCase(), playlist_id });
        await this.tagPlaylistRepository.save(tagPlaylist);
        
        const tagSong = this.tagSongRepository.create({ name: name.trim().toLowerCase(), song_id })
        await this.tagSongRepository.save(tagSong);

        return { tag_playlist: tagPlaylist, tag_song: tagSong };
    }
}