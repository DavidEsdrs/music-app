import { PlaylistsNotFoundError } from "../../../api/APIErrors";
import { ResponseEntity } from "../../../api/ResponseEntity";
import { Playlist } from "../../../entities/Playlist";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { IUpdatePlaylistDTO } from "./IUpdatePlaylistDTO";

export class UpdatePlaylistService {
    constructor(
        private playlistsRepository: IPlaylistsRepository
    ) {}

    async execute({ playlist_id, partial_playlist, user_id }: IUpdatePlaylistDTO) {
        const playlist = await this.playlistsRepository.findById(playlist_id);
        if(!playlist || (playlist.creator_fk !== user_id)) {
            throw new PlaylistsNotFoundError();
        }
        await this.playlistsRepository.updatePlaylist(playlist, partial_playlist);
        const res = new ResponseEntity<Playlist>("Playlist successfully updated!", 200);
        return res;
    }
}