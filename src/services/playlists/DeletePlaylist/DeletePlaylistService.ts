import { UnauthorizedRequestError } from "../../../api/APIErrors";
import { ResponseEntity } from "../../../api/ResponseEntity";
import { Playlist } from "../../../entities/Playlist";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { IPlaylistUserRepository } from "../../../repositories/PlaylistUserRepository";
import { ISongPlaylistRepository } from "../../../repositories/SongPlaylistRepository";
import { IDeletePlaylistDTO } from "./DeletePlaylistDTO";

export class DeletePlaylistService {
    constructor(
        private playlistsRepository: IPlaylistsRepository,
        private songPlaylistRepository: ISongPlaylistRepository,
        private playlistUserRepository: IPlaylistUserRepository
    ) {}

    async execute(args: IDeletePlaylistDTO) {
        const playlist = await this.playlistsRepository.findById(args.playlist_id);
        if(playlist.creator_fk !== args.user_id) {
            throw new UnauthorizedRequestError();
        }
        await this.songPlaylistRepository.delete({ playlist_id: args.playlist_id });
        await this.playlistUserRepository.delete({ playlist_id: args.playlist_id });
        await this.playlistsRepository.delete({ id: args.playlist_id });
        const response = new ResponseEntity<Playlist>("Playlist successful deleted!", 200);
        response.deleted = playlist;
        return response;
    }
}