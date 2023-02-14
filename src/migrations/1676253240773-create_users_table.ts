import { MigrationInterface, QueryRunner } from "typeorm"

export class createUsersTable1676253240773 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            CREATE TABLE users(
                idUser INT PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(100) NOT NULL,
                username VARCHAR(30) NOT NULL,
                bio VARCHAR(255),
                path_profile_picture VARCHAR(255),
                created_at DATETIME DEFAULT NOW(),
                updated_at DATETIME DEFAULT NOW()
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query("DROP TABLE users");
    }

}