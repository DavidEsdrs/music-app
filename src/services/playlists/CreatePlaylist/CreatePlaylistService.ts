import { Playlist } from "../../../entities/Playlist";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { ICreatePlaylistDTO } from "./CreatePlaylistDTO";

export class CreatePlaylistService {
    constructor(
        private playlistsRepository: IPlaylistsRepository
    ) {}

    async execute(args: ICreatePlaylistDTO) {
        const playlist = this.playlistsRepository.create(args);
        const createdPlaylistId = await this.playlistsRepository.savePlaylist(playlist);
        return {
            idPlaylist: createdPlaylistId,
            ...playlist
        } as Playlist;
    }
}