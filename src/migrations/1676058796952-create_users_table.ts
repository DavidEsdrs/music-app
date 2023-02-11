import { MigrationInterface, QueryRunner } from "typeorm"

export class createUsersTable1676058796952 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            CREATE TABLE users(
                id INT PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(50) NOT NULL,
                email VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(97) NOT NULL,
                path_profile_picture VARCHAR(200),
                bio VARCHAR(255),
                created_at DATETIME DEFAULT NOW(),
                updated_at DATETIME DEFAULT NOW()
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            DROP TABLE users
        `);
    }

}