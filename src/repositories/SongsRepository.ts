import { Song } from "../entities/Song";
import { GenericRepository } from "./GenericRepository";

export interface ISongsRepository extends GenericRepository<Song> {
    saveSong(song: Partial<Song>): Promise<Song>;
    isPublicSong(song_id: number): Promise<boolean>;
    deleteSong(id: number): Promise<void>;
}