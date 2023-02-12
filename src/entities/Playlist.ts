import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity("playlists")
export class Playlist {
    @PrimaryGeneratedColumn({ name: "idPlaylist" })
    id: number;

    @Column({ name: "title", type: "varchar" })
    title: string;

    @Column({ name: "path_featured_picture", type: "varchar" })
    path_featured_picture: string;
    
    @Column({ name: "visibility", type: "enum", enum: ["public", "private"], default: "private" })
    visibility: string;
    
    @Column({ name: "description", type: "varchar" })
    description: string;

    @ManyToOne(() => User, user => user.id)
    creator_fk: User;

    @Column({ name: "released_on", type: "year", default: "now()" })
    released_on: number;
    
    @CreateDateColumn({ name: "created_at" })
    created_at: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updated_at: Date;
}