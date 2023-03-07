import { Playlist } from "../../../entities/Playlist";

export interface IUpdatePlaylistDTO {
    playlist_id: number;
    partial_playlist: Partial<Playlist>;
    user_id: number;
}