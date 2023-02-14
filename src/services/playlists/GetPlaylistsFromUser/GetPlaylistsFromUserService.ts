import { Playlist } from "../../../entities/Playlist";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { IPlaylistUserRepository } from "../../../repositories/PlaylistUserRepository";

export class GetPlaylistsFromUserService {
    constructor(
        private playlistsRepository: IPlaylistsRepository,
        private playlistUserRepository: IPlaylistUserRepository
    ) {}

    async execute({ user_id, requester_id }) {
        const playlistsUserRelation = await this.playlistUserRepository.findBy({ user_id });

        const playlistsIds = playlistsUserRelation.map(p => p.playlist_id);

        const playlists = await this.playlistsRepository.findManyById(playlistsIds);

        if(user_id !== requester_id) {
            return this.publicPlaylists(playlists);
        }
        
        return playlists;
    }

    publicPlaylists(playlists: Playlist[]) {
        return playlists.filter(p => p.visibility === "public");
    }
}