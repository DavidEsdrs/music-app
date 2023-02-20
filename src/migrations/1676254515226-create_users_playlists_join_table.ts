import { MigrationInterface, QueryRunner } from "typeorm"

export class createUsersPlaylistsJoinTable1676254515226 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            CREATE TABLE playlists_users(
                playlist_id INT NOT NULL,
                user_id INT NOT NULL,
                PRIMARY KEY(playlist_id, user_id),
                FOREIGN KEY (playlist_id) 
                    REFERENCES playlists(idPLaylist)
                    ON DELETE CASCADE,
                FOREIGN KEY (user_id) 
                    REFERENCES users(idUser)
                    ON DELETE CASCADE 
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`DROP TABLE playlists_users`);
    }
}
