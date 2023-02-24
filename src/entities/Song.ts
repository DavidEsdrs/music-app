import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("songs")
export class Song {
    @PrimaryGeneratedColumn({ name: "idSong" })
    idSong: number;

    @Column({ name: "title", type: "varchar" })
    title: string;

    @Column({ name: "creator_fk", type: "int" })
    creator_fk: number;

    @Column({ name: "file_path", type: "varchar" })
    file_path: string;

    @CreateDateColumn({ name: "created_at" })
    created_at: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updated_at: Date;
}