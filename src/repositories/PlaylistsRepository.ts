import { ResponseEntity } from "../api/ResponseEntity";
import { Playlist } from "../entities/Playlist";
import { Song } from "../entities/Song";
import { SongPlaylist } from "../entities/SongPlaylist";
import { InsertEntity } from "../utils/InsertEntity";
import { GenericRepository } from "./GenericRepository";

export type PartialPlaylist = Partial<Omit<Playlist, "creator_fk">> & { creator_fk: number };
export type PlaylistCopy = Playlist;

export interface IPlaylistsRepository extends GenericRepository<Playlist> {
    findManyById(id: number[]): Promise<Playlist[]>;
    findDefaultPlaylist(user_id: number): Promise<Playlist>;
    findSongsByPlaylist(id: number): Promise<Song[]>;
    saveMany(songs: SongPlaylist[]): Promise<any>;
    addSongToPlaylist(playlist_id: number, song_id: number): Promise<void>;
    copyAndSavePlaylist(playlist_to_copy: number, copy_owner_id: number): Promise<InsertEntity<Playlist>>;
    savePlaylist(playlist: PartialPlaylist): Promise<Playlist>;
    findPlaylistsByUser(user_id: number): Promise<Playlist[]>;
    deletePlaylist(playlist_id: number): Promise<any>;
    findFamousPlaylists(limit: number): Promise<Playlist[]>;
    removeSongFromPlaylist(song_id: number, playlist_id: number): Promise<ResponseEntity<Playlist>>;
}