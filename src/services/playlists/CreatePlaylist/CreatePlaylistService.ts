import { IPlaylistUserRepository } from "../../../repositories/PlaylistUserRepository";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { ICreatePlaylistDTO } from "./CreatePlaylistDTO";

export class CreatePlaylistService {
    constructor(
        private playlistsRepository: IPlaylistsRepository,
        private playlistUserRepository: IPlaylistUserRepository
    ) {}

    async execute(args: ICreatePlaylistDTO) {
        const playlist = this.playlistsRepository.create(args);
        const createdPlaylist = await this.playlistsRepository.save(playlist);
        const relationPlaylistUser = this.playlistUserRepository.create({ 
            playlist_id: createdPlaylist.id, 
            user_id: args.creator_fk
        });
        await this.playlistUserRepository.save(relationPlaylistUser);
        return createdPlaylist;
    }
}