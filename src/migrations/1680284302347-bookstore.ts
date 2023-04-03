import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class bookstore1680284302347 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "bookstore",
        columns: [
          {
            name: "id",
            type: "uuid",
          },
          {
            name: "bookname",
            type: "varchar(55)",
          },
          {
            name: "author",
            type: "varchar(55)",
          },
          {
            name: "price",
            type: "double precision",
          },
          {
            name: "review",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("bookstore");
  }
}
