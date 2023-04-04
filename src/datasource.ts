import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  poolSize: 100,
  host: "bookstoredb",
  port: 5432,
  username: "postgres",
  password: "postgres",
  synchronize: true,
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  entities: [`${__dirname}/entities/*.{ts,js}`],
  uuidExtension: "pgcrypto",
});
