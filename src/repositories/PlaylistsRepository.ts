import { Playlist } from "../entities/Playlist";
import { GenericRepository } from "./GenericRepository";

export type PartialPlaylist = Partial<Omit<Playlist, "creator_fk">> & { creator_fk: number };

export interface IPlaylistsRepository extends GenericRepository<Playlist> {
    findManyById(id: number[]): Promise<Playlist[]>;
    findDefaultPlaylist(user_id: number): Promise<Playlist>;
}