import { UnauthorizedRequestError } from "../../../api/APIErrors";
import { ResponseEntity } from "../../../api/ResponseEntity";
import { SongPlaylist } from "../../../entities/SongPlaylist";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { ISongPlaylistRepository } from "../../../repositories/SongPlaylistRepository";
import { ISongsRepository } from "../../../repositories/SongsRepository";

export class AddSongToPlaylistService {
    constructor(
        private songPlaylistRepository: ISongPlaylistRepository,
        private playlistsRepository: IPlaylistsRepository
    ) {}

    async execute({ user_id, song_id, playlist_id }) {
        const playlist = await this.playlistsRepository.findById(playlist_id);
        if(playlist.creator_fk !== user_id) {
            throw new UnauthorizedRequestError();
        }
        const songPlaylistRel = this.songPlaylistRepository.create({ playlist_id, song_id });
        await this.songPlaylistRepository.save(songPlaylistRel);
        const response = new ResponseEntity<SongPlaylist>("The song " + song_id + " was added to " + playlist_id, 200);
        response.updated = songPlaylistRel;
        return response;
    }
}