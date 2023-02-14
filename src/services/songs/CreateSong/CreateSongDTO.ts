import { Song } from "../../../entities/Song";

export type PartialSong = Partial<Omit<Song, "created_at" | "updated_at" | "id">>;

export interface ICreateSongDTO {
    song: PartialSong;
}