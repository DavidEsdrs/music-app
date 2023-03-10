import { UnauthorizedRequestError } from "../../../api/APIErrors";
import { ISongsRepository } from "../../../repositories/SongsRepository";
import { IDonwloadSongDTO } from "./DownloadSongDTO";
import fs from "fs";
import path from "path";

export class DownloadSongService {
    constructor(
        private songsRepository: ISongsRepository
    ) {}
    
    async execute({ user_id, song_id }: IDonwloadSongDTO) {
        const isPublicSong = await this.songsRepository.isPublicSong(song_id);

        if(!isPublicSong) {
            throw new UnauthorizedRequestError();
        }

        const song = await this.songsRepository.findById(song_id);

        const downloadPath = path.resolve(__dirname, "..", "..", "..", "..", "uploads", "songs", song.file_path);

        const readableStream = fs.createReadStream(downloadPath, { highWaterMark: 1024 });

        return readableStream;
    }
}