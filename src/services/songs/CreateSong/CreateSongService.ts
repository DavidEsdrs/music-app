import { Song } from "../../../entities/Song";
import { IPlaylistsRepository } from "../../../repositories/PlaylistsRepository";
import { ISongsRepository } from "../../../repositories/SongsRepository";
import { FileHandling } from "../../../utils/fileHandling/FileHandling";
import { fulfillSong } from "../../../utils/fulfillInfo";
import { IAddSongToPlaylistService } from "../../playlists/AddSongToPlaylist/AddSongToPlaylistController";
import { ICreateSongDTO } from "./CreateSongDTO";

export class CreateSongService {
    constructor(
        private songsRepository: ISongsRepository,
        private fileHandling: FileHandling
    ) {}

    async execute({ title, file_path, creator_fk, tags }: ICreateSongDTO) {
        const song = this.songsRepository.create({ title, creator_fk, file_path });
        const songId = await this.songsRepository.saveSong(song);
        const songInDb = await this.songsRepository.findById(songId);
        return await fulfillSong(songInDb, this.fileHandling) as Song;
    }
}