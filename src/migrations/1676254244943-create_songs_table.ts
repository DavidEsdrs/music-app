import { MigrationInterface, QueryRunner } from "typeorm"

export class createSongsTable1676254244943 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            CREATE TABLE songs(
                idSong INT PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(50) NOT NULL,
                file_path VARCHAR(200),
                created_at DATETIME DEFAULT NOW(),
                updated_at DATETIME DEFAULT NOW(),
                creator_fk INT NOT NULL,
                FOREIGN KEY (creator_fk) REFERENCES users(idUser)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query("DROP TABLE songs");
    }

}
