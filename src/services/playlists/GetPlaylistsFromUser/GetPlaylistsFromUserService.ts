import { Playlist } from "../../../entities/Playlist";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { IGetPlaylistsFromUserDTO } from "./GetPlaylistsFromUserDTO";

export class GetPlaylistsFromUserService {
    constructor(
        private playlistsRepository: IPlaylistsRepository
    ) {}

    async execute({ user_id, requester_id }: IGetPlaylistsFromUserDTO) {
        const playlists = await this.playlistsRepository.findPlaylistsByUser(user_id);

        if(user_id !== requester_id) {
            return this.publicPlaylists(playlists);
        }

        const playlistsAndSongs = playlists.map(playlist => ({
            ...playlist,
            songs_url: `${process.env.API_URL}/user/playlist/${playlist.id}`
        }));
        
        return playlistsAndSongs;
    }

    publicPlaylists(playlists: Playlist[]) {
        return playlists.filter(p => p.visibility === "public");
    }
}