import { DefaultPlaylistDeleteError, PlaylistsNotFoundError } from "../../../api/APIErrors";
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
        if(!this.isRequesterCreator(playlist.creator_fk, requester_id)) {
            throw new PlaylistsNotFoundError();
        }
        // A user mustn't be able to delete its own default playlist
        if(playlist.title === "UPLOADED_SONGS") {
            throw new DefaultPlaylistDeleteError();
        }
        await this.playlistsRepository.deletePlaylist(playlist.idPlaylist);
        const result = new ResponseEntity<Playlist>("Successfully deleted", 200);
        result.deleted = playlist;
        return result;
    }

    isRequesterCreator = (creator_fk: number, requester_id: number) => creator_fk === requester_id;
}