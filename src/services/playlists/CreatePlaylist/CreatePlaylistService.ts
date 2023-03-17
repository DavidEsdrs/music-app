import { Playlist } from "../../../entities/Playlist";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { ITagRepository } from "../../../repositories/TagRepository";
import { ICreatePlaylistDTO } from "./CreatePlaylistDTO";

export class CreatePlaylistService {
    constructor(
        private playlistsRepository: IPlaylistsRepository,
        private tagsRepository: ITagRepository
    ) {}

    async execute({ title, description, creator_fk, path_featured_picture, released_on, tags, visibility }: ICreatePlaylistDTO) {
        const playlist = this.playlistsRepository.create({ title, description, creator_fk, path_featured_picture, released_on, visibility });
        const createdPlaylistId = await this.playlistsRepository.savePlaylist(playlist);
        const promisses = tags.map(tag => {
            const tagObj = this.tagsRepository.create({ name: tag });
            return this.tagsRepository.save(tagObj);
        });
        const tagsInDb = await Promise.all([...promisses]);
        return {
            idPlaylist: createdPlaylistId,
            ...playlist,
            tags: tagsInDb
        } as Playlist;
    }
}