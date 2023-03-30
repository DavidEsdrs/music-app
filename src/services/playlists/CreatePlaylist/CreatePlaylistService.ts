import { Playlist } from "../../../entities/Playlist";
import { TagPlaylist } from "../../../entities/Tag";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { ITagPlaylistRepository } from "../../../repositories/TagRepository";
import { ICreatePlaylistDTO } from "./CreatePlaylistDTO";

export class CreatePlaylistService {
    constructor(
        private playlistsRepository: IPlaylistsRepository,
        private tagsRepository: ITagPlaylistRepository
    ) {}

    async execute({ title, description, creator_fk, path_featured_picture, released_on, tags, visibility }: ICreatePlaylistDTO) {
        const playlist = this.playlistsRepository.create({ title, description, creator_fk, path_featured_picture, released_on, visibility });
        const createdPlaylistId = await this.playlistsRepository.savePlaylist(playlist);
        const saveTagPromises = tags.map(tag => this.saveTagPromise(tag, createdPlaylistId));
        const tagsInDb = await Promise.all([...saveTagPromises]);
        return {
            idPlaylist: createdPlaylistId,
            ...playlist,
            tags: tagsInDb
        } as Playlist;
    }

    async saveTagPromise(tag: TagPlaylist, playlistId: number) {
        const tagObj = this.tagsRepository.create({ name: tag.name, tag_type: tag.tag_type, playlist_id: playlistId });
        const tagInDb = await this.tagsRepository.save(tagObj);
        return tagInDb;
    }
}