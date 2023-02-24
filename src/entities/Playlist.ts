import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Song } from "./Song";
import { User } from "./User";

@Entity("playlists")
export class Playlist {
    @PrimaryGeneratedColumn({ name: "idPlaylist" })
    idPlaylist: number;

    @Column({ name: "title", type: "varchar" })
    title: string;

    @Column({ name: "path_featured_picture", type: "varchar" })
    path_featured_picture: string;
    
    @Column({ name: "visibility", type: "enum", enum: ["public", "private"], default: "private" })
    visibility: string;
    
    @Column({ name: "description", type: "varchar" })
    description: string;

    @Column({ name: "released_on", type: "year" })
    released_on: number;
    
    @CreateDateColumn({ name: "created_at" })
    created_at: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updated_at: Date;

    @Column({ name: "creator_fk", type: "int" })
    creator_fk: number;
}