import { Entity, PrimaryColumn } from "typeorm";

@Entity("playlists_users")
export class PlaylistUser {
    @PrimaryColumn({ name: "playlist_id", type: "int" })
    playlist_id: number;

    @PrimaryColumn({ name: "user_id", type: "int" })
    user_id: number;
}