import fs from "fs";
import path from "path";
import { ForbiddenRequestError, SongNotFoundError, UnauthorizedRequestError } from "../../../api/APIErrors";
import { ISongsRepository } from "../../../repositories/SongsRepository";
import { IDonwloadSongDTO } from "./DownloadSongDTO";
import { isPublicSong } from "../../../utils/checkPlaylist";

export class DownloadSongService {
    constructor(
        private songsRepository: ISongsRepository
    ) {}
    
    async execute({ user_id, song_id }: IDonwloadSongDTO) {
        const song = await this.songsRepository.joinSongPublicPlaylists(song_id);

        if(!isPublicSong(song.playlists) && !this.isRequestCreator(song.creator_fk, user_id)) {
            throw new ForbiddenRequestError();
        }

        const downloadPath = path.resolve(__dirname, "..", "..", "..", "..", "uploads", "songs", song.file_path);

        const readableStream = fs.createReadStream(downloadPath, { highWaterMark: 1024 });

        return readableStream;
    }

    isRequestCreator = (creator_fk: number, user_id: number) => creator_fk === user_id;
}