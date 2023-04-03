import { MigrationInterface, QueryRunner } from "typeorm"

export class createTagsTable1678890947949 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE song_tags (
                idSongTag INT PRIMARY KEY AUTO_INCREMENT,
                song_id INT NOT NULL,
                name VARCHAR(20) NOT NULL,
                tag_type ENUM("genre", "feature", "artist") NOT NULL DEFAULT "feature",
                created_at DATETIME DEFAULT NOW(),
                updated_at DATETIME DEFAULT NOW(),
                FOREIGN KEY (song_id) 
                    REFERENCES songs(idSong)
                    ON DELETE CASCADE
            );
        `);

        await queryRunner.query(`
            CREATE TABLE playlist_tags (
                idPlaylistTag INT PRIMARY KEY AUTO_INCREMENT,
                playlist_id INT NOT NULL,
                name VARCHAR(20) NOT NULL,
                tag_type ENUM("genre", "feature", "artist") NOT NULL DEFAULT "feature",
                created_at DATETIME DEFAULT NOW(),
                updated_at DATETIME DEFAULT NOW(),
                FOREIGN KEY (playlist_id) 
                    REFERENCES playlists(idPlaylist)
                    ON DELETE CASCADE
            );    
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`DROP TABLE song_tags`);
        await queryRunner.query(`DROP TABLE playlist_tags`);
    }
}