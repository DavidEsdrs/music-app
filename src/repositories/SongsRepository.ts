import { Playlist } from "../entities/Playlist";
import { Song } from "../entities/Song";
import { User } from "../entities/User";
import { GenericRepository } from "./GenericRepository";

interface __SongJoin {
    playlists: Partial<Playlist>[];
}

export type SongJoin = Partial<Song & __SongJoin>;

export interface ISongsRepository extends GenericRepository<Song> {
    saveSong(song: Partial<Song>): Promise<number>;
    deleteSong(id: number): Promise<void>;
    joinSongPlaylistUser(song_id: number): Promise<SongJoin>;
    joinSongPublicPlaylists(song_id: number): Promise<SongJoin>;
}