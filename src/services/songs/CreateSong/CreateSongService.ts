import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { ISongsRepository } from "../../../repositories/SongsRepository";
import { IAddSongToPlaylistService } from "../../playlists/AddSongToPlaylist/AddSongToPlaylistController";
import { ICreateSongDTO } from "./CreateSongDTO";

export class CreateSongService {
    constructor(
        private songsRepository: ISongsRepository
    ) {}

    async execute(args: ICreateSongDTO) {
        const song = this.songsRepository.create(args.song);
        const songSaved = await this.songsRepository.saveSong(song);
        const songWithDownload = {
            ...songSaved,
            download_link: `${process.env.API_URL}/song/${songSaved.idSong}/download`
        };
        return songWithDownload;
    }
}