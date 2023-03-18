import { Playlist } from "../entities/Playlist";
import { Song } from "../entities/Song";
import { Tag } from "../entities/Tag";
import { GenericRepository } from "./GenericRepository";

export type SongAndPlaylist = {
    songs: Song[];
    playlists: Playlist[];
};

export interface ITagRepository extends GenericRepository<Tag> {
    findByName(name: string): Promise<Tag>;
    findSongAndPlaylistByTag(tag: string, limit: number): Promise<SongAndPlaylist[]>;
}