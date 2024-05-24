import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1716519753086 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await queryRunner.query(`CREATE TABLE task(
        id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
        title varchar(256) NOT NULL,
        description varchar(256) NOT NULL,
        status varchar(256) NOT NULL DEFAULT 'TO_DO',
        expiration_dt timestamptz NOT NULL,

    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS task;`);
  }
}
