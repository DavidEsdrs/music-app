import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("refresh_tokens")
export class RefreshToken {
    @PrimaryGeneratedColumn()
    idRefreshToken: number;

    @Column({ name: "token", type: "varchar" })
    token: string;

    @CreateDateColumn({ name: "created_at" })
    created_at: Date;
    
    @Column({ name: "user_id", type: "int" })
    user_id: number;
}