import {MigrationInterface, QueryRunner} from "typeorm";

export class AuthorAddAge1546246757615 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.query(`
        alter table author add column (age  smallint(5));
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
