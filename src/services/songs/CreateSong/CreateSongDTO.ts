import { TagSong } from "../../../entities/Tag";

export interface ICreateSongDTO {
    title: string;
    file_path: string;
    creator_fk: number;
    tags: TagSong[];
}