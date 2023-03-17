import { Song } from "../../../entities/Song";

export interface ICreateSongDTO {
    title: string;
    file_path: string;
    tags: string[];
}