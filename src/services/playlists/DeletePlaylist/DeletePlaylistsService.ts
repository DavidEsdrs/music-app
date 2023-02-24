import { PlaylistsNotFoundError } from "../../../api/APIErrors";
import { ResponseEntity } from "../../../api/ResponseEntity";
import { Playlist } from "../../../entities/Playlist";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { checkPlaylist } from "../../../utils/checkPlaylist";
import { IDeletePlaylistDTO } from "./DeletePlaylistDTO";

export class DeletePlaylistService {
    constructor(
        private playlistsRepository: IPlaylistsRepository
    ) {}

    async execute({ playlist_id, requester_id }: IDeletePlaylistDTO) {
        const playlist = await this.playlistsRepository.findById(playlist_id);
        if(!checkPlaylist(playlist, requester_id)) {
            throw new PlaylistsNotFoundError();
        }
        if(playlist.title === "UPDATED_SONGS") {
            throw new Error("Can't delete default playlist!");
        }
        await this.playlistsRepository.deletePlaylist(playlist.idPlaylist);
        const result = new ResponseEntity<Playlist>("Successfully deleted", 200);
        result.deleted = playlist;
        return result;
    }
}