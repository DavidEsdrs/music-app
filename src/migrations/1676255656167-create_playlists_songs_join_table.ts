import { MigrationInterface, QueryRunner } from "typeorm"

export class createPlaylistsSongsJoinTable1676255656167 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            CREATE TABLE songs_playlists(
                song_id INT NOT NULL,
                playlist_id INT NOT NULL,
                PRIMARY KEY(song_id, playlist_id),
                FOREIGN KEY (playlist_id) 
                    REFERENCES playlists(idPLaylist)
                    ON DELETE CASCADE,
                FOREIGN KEY (song_id) 
                    REFERENCES songs(idSong)
                    ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`DROP TABLE songs_playlists`);
    }

}
