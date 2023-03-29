import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("song_tags")
export class TagSong {
    @PrimaryGeneratedColumn()
    idSongTag: number;

    @Column({ name: "name", type: "varchar", nullable: false })
    name: string;

    @Column({ name: "song_id", type: "integer" })
    song_id: number;

    @Column({ name: "type", type: "enum", enum: ["feature", "genre", "artist"] })
    type: "feature" | "genre" | "artist";

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

@Entity("playlist_tags")
export class TagPlaylist {
    @PrimaryGeneratedColumn()
    idPlaylistTag: number;

    @Column({ name: "name", type: "varchar", nullable: false })
    name: string;

    @Column({ name: "playlist_id", type: "integer" })
    playlist_id: number;

    @Column({ name: "type", type: "enum", enum: ["feature", "genre", "artist"] })
    type: "feature" | "genre" | "artist";

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}