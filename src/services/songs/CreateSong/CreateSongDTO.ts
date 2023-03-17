import { Song } from "../../../entities/Song";

export interface ICreateSongDTO {
    title?: string;
    creator_fk?: number;
    idSong?: number;
    file_path?: string;
}