import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { IGetPlaylistsDTO } from "./GetPlaylistsDTO";

export class GetPlaylists {
    constructor(
        private playlistsRepository: IPlaylistsRepository
    ) {}

    async execute({ limit = 5 }: IGetPlaylistsDTO) {
        const playlists = await this.playlistsRepository.findFamousPlaylists(limit);
        return playlists;
    }
}