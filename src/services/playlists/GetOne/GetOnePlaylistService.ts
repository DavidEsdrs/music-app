import { UnauthorizedRequestError } from "../../../api/APIErrors";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { IGetOnePlaylistDTO } from "./GetOnePLaylistDTO";

export class GetOnePLaylistService {
    constructor(
        private playlistsRepository: IPlaylistsRepository
    ) {}

    async execute({ id, requester_id }: IGetOnePlaylistDTO) {
        const playlist = await this.playlistsRepository.findById(id);
        if(playlist.creator_fk !== requester_id) {
            throw new UnauthorizedRequestError();
        }
        return playlist;
    }
}