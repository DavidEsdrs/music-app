import { MigrationInterface, QueryRunner } from "typeorm"

export class createTagsTable1678890947949 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            CREATE TABLE tags(
                idTag INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(20) NOT NULL,
                playlist_id INT,
                song_id INT,
                created_at DATETIME DEFAULT NOW(),
                updated_at DATETIME DEFAULT NOW(),
                FOREIGN KEY (playlist_id) 
                    REFERENCES playlists(idPlaylist)
                    ON DELETE SET NULL,
                FOREIGN KEY (song_id) 
                    REFERENCES songs(idSong)
                    ON DELETE SET NULL,
                CONSTRAINT check_fks CHECK((playlist_id IS NOT NULL AND song_id IS NULL) OR (song_id IS NOT NULL AND playlist_id IS NULL))
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`DROP TABLE tags`);
    }

}
