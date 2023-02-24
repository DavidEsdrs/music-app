import { UnauthorizedRequestError } from "../../../api/APIErrors";
import { ISongsRepository } from "../../../repositories/SongsRepository";
import { IDeleteSongDTO } from "./DeleteSongDTO";
import { unlink } from "fs";
import { promisify } from "util";
import path from "path";
import { ResponseEntity } from "../../../api/ResponseEntity";
import { Song } from "../../../entities/Song";

const removeFile = promisify(unlink);

export class DeleteSongService {
    constructor(
        private songsRepository: ISongsRepository
    ) {}

    async execute({ song_id, user_id }: IDeleteSongDTO) {
        const song = await this.songsRepository.findById(song_id);
        if(!song) {
            throw new UnauthorizedRequestError();
        }
        if(song.creator_fk !== user_id) {
            throw new UnauthorizedRequestError();
        }
        const songsPath = path.resolve(__dirname, "..", "..", "..", "..", "uploads", "songs", song.file_path);
        await removeFile(songsPath);
        await this.songsRepository.deleteSong(song_id);
        const result = new ResponseEntity<Song>(`Song ${song.idSong} deleted`, 200);
        result.deleted = song;
        return result;
    }
}