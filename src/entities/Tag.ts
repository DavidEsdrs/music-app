import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("tags")
export class Tag {
    @PrimaryGeneratedColumn()
    idTag: number;

    @Column({ name: "name", type: "varchar", nullable: false })
    name: string;

    @Column({ name: "playlist_id", type: "integer" })
    playlist_id: number;

    @Column({ name: "song_id", type: "integer" })
    song_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}