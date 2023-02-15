import { UnauthorizedRequestError } from "../../../api/APIErrors";
import { ResponseEntity } from "../../../api/ResponseEntity";
import { Playlist } from "../../../entities/Playlist";
import { PlaylistUser } from "../../../entities/PlaylistUser";
import { Song } from "../../../entities/Song";
import { SongPlaylist } from "../../../entities/SongPlaylist";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { IAddPlaylistToUserDTO } from "./AddPlaylistToUserDTO";

export class AddPlaylistToUserService {
    constructor(
        private playlistRepository: IPlaylistsRepository
    ) {}

    async execute(args: IAddPlaylistToUserDTO) {
        const playlist = await this.playlistRepository.findById(args.playlist_id);
        
        /* Check wether the playlist is public or not */
        if(playlist.creator_fk !== args.user_id && playlist.visibility !== "public") {
            throw new UnauthorizedRequestError();
        }

        /* Creates a copy from the playlist that the user want to added to his playlist list  */
        const playlistCopy = await this.playlistRepository.copyAndSavePlaylist(playlist.id, args.user_id);

        const response = new ResponseEntity<Playlist>(
            `Playlist ${args.playlist_id} added to user ${args.user_id} as ${playlistCopy.id}`,
            200
        );
        
        response.updated = playlistCopy;
        return response;
    }
}