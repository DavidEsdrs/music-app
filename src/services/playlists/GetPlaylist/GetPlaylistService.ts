import { PlaylistsNotFoundError } from "../../../api/APIErrors";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { fulfillPlaylist } from "../../../utils/fulfillInfo";
import { IGetPlaylistDTO } from "./GetPlaylistDTO";

export class GetPlaylistService {
    constructor(
        private playlistsRepository: IPlaylistsRepository
    ) {}

    async execute({ playlist_id, user_id }: IGetPlaylistDTO) {
        const playlist = await this.playlistsRepository.findById(playlist_id);
        if(!playlist) {
            throw new PlaylistsNotFoundError();
        }
        if(playlist.creator_fk !== user_id && playlist.visibility !== "public") {
            throw new PlaylistsNotFoundError();
        }
        return fulfillPlaylist(playlist);
    }
}