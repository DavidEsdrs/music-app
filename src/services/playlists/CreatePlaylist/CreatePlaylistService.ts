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
        const promises = tags.map(tag => this.saveTagPromise(tag.toLowerCase().trim(), createdPlaylistId));
        const tagsInDb = await Promise.all([...promises]);
        return {
            idPlaylist: createdPlaylistId,
            ...playlist,
            tags: tagsInDb
        } as Playlist;
    }

    async saveTagPromise(tag: string, playlistId: number) {
        const tagObj = this.tagsRepository.create({ name: tag, playlist_id: playlistId });
        const tagInDb = await this.tagsRepository.save(tagObj);
        return tagInDb;
    }
}