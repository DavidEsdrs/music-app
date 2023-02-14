import { Entity, PrimaryColumn } from "typeorm";

@Entity("songs_playlists")
export class SongPlaylist {
    @PrimaryColumn({ name: "song_id", type: "int" })
    song_id: number;

    @PrimaryColumn({ name: "playlist_id", type: "int" })
    playlist_id: number;
}