import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createRefreshTokenTable1678476984531 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            CREATE TABLE refresh_tokens(
                idRefreshToken INT PRIMARY KEY AUTO_INCREMENT,
                token VARCHAR(200) NOT NULL,
                created_at DATETIME DEFAULT NOW(),
                user_id INT NOT NULL,
                FOREIGN KEY (user_id) 
                    REFERENCES users(idUser)
                    ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("refresh_tokens");
    }

}
