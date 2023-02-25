import { UnauthorizedRequestError } from "../../../api/APIErrors";
import { ResponseEntity } from "../../../api/ResponseEntity";
import { Playlist } from "../../../entities/Playlist";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { IRemoveSongFromPlaylistDTO } from "./RemoveSongFromPlaylistDTO";

export class RemoveSongFromPlaylist {
    constructor(
        private playlistsRepository: IPlaylistsRepository
    ) {}

    async execute({ song_id, playlist_id, user_id }: IRemoveSongFromPlaylistDTO) {
        const playlist = await this.playlistsRepository.findById(playlist_id);
        if(!playlist || !this.isRequesterCreator(playlist.creator_fk, user_id)) {
            throw new UnauthorizedRequestError();
        }
        await this.playlistsRepository.removeSongFromPlaylist(song_id,playlist_id);
        const result = new ResponseEntity<Playlist>("Song " + song_id + " removed from playlist " + playlist_id, 200);
        return result;
    }

    isRequesterCreator = (creator_fk: number, user_id: number) => creator_fk === user_id;
}