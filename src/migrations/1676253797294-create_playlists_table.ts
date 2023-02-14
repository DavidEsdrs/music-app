import { MigrationInterface, QueryRunner } from "typeorm"

export class createPlaylistsTable1676253797294 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            CREATE TABLE playlists(
                idPlaylist INT PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(50) NOT NULL,
                description VARCHAR(255),
                visibility ENUM("public", "private") NOT NULL DEFAULT "private",
                path_featured_picture VARCHAR(200),
                released_on YEAR(4),
                created_at DATETIME DEFAULT NOW(),
                updated_at DATETIME DEFAULT NOW(),
                creator_fk INT NOT NULL,
                FOREIGN KEY (creator_fk) REFERENCES users(idUser)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE playlists`);
    }

}
