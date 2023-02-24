import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Playlist } from "./Playlist";
import { Song } from "./Song";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn({ name: "idUser" })
    idUser: number;

    @Column({ name: "username", type: "varchar" })
    username: string;

    @Column({ name: "email", type: "varchar" })
    email: string;

    @Column({ name: "password", type: "varchar" })
    password: string;

    @Column({ name: "bio", type: "varchar" })
    bio: string;
    
    @Column({ name: "path_profile_picture", type: "varchar" })
    path_profile_picture: string;

    @CreateDateColumn({ name: "created_at" })
    created_at: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updated_at: Date;
}