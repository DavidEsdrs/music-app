import { UnauthorizedRequestError } from "../../../api/APIErrors";
import { ResponseEntity } from "../../../api/ResponseEntity";
import { PlaylistUser } from "../../../entities/PlaylistUser";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { IPlaylistUserRepository } from "../../../repositories/PlaylistUserRepository";
import { IAddPlaylistToUserDTO } from "./AddPlaylistToUserDTO";

export class AddPlaylistToUserService {
    constructor(
        private playlistRepository: IPlaylistsRepository,
        private playlistUserRepository: IPlaylistUserRepository
    ) {}

    async execute(args: IAddPlaylistToUserDTO) {
        const playlist = await this.playlistRepository.findById(args.playlist_id);
        if(playlist.creator_fk !== args.user_id && playlist.visibility === "private") {
            throw new UnauthorizedRequestError();
        }
        const playlistUserRel = this.playlistUserRepository.create({ playlist_id: args.playlist_id, user_id: args.user_id });
        await this.playlistUserRepository.save(playlistUserRel);
        const response = new ResponseEntity<PlaylistUser>(`Playlist ${args.playlist_id} added to user ${args.user_id}`, 200);
        response.updated = playlistUserRel;
        return response;
    }
}