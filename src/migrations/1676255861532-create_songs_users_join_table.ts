import { MigrationInterface, QueryRunner } from "typeorm"

export class createSongsUsersJoinTable1676255861532 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            CREATE TABLE songs_users(
                song_id INT NOT NULL,
                user_id INT NOT NULL,
                PRIMARY KEY(song_id, user_id),
                FOREIGN KEY (user_id) REFERENCES users(idUser),
                FOREIGN KEY (song_id) REFERENCES songs(idSong)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`DROP TABLE songs_users`);
    }

}
