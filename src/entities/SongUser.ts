import { Entity, PrimaryColumn } from "typeorm";

@Entity("songs_users")
export class SongUser {
    @PrimaryColumn({ name: "song_id", type: "int" })
    song_id: number;

    @PrimaryColumn({ name: "user_id", type: "int" })
    user_id: number;
}