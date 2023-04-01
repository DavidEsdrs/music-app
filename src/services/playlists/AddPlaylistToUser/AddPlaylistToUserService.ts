import { UnauthorizedRequestError } from "../../../api/APIErrors";
import { ResponseEntity } from "../../../api/ResponseEntity";
import { Playlist } from "../../../entities/Playlist";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { InsertEntity } from "../../../utils/InsertEntity";
import { IAddPlaylistToUserDTO } from "./AddPlaylistToUserDTO";

export class AddPlaylistToUserService {
    constructor(
        private playlistRepository: IPlaylistsRepository
    ) {}

    async execute(args: IAddPlaylistToUserDTO) {
        const playlist = await this.playlistRepository.findById(args.playlist_id);
        
        /* Check wether the playlist is public or not */
        if(playlist.creator_fk !== args.user_id && playlist.visibility !== "public") {
            throw new UnauthorizedRequestError("Unauthorized access to the requested playlist. The playlist is either not public or the user is not the owner.");
        }

        /* Creates a copy from the playlist that the user want to added to his playlist list  */
        const playlistCopy = await this.playlistRepository.copyAndSavePlaylist(playlist.idPlaylist, args.user_id);

        const response = new ResponseEntity<InsertEntity<Playlist>>(
            `Playlist ${args.playlist_id} added to user ${args.user_id} as ${playlistCopy.insertId}`,
            200
        );
        
        response.updated = playlistCopy;
        return response;
    }
}