import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../users/user.entity.js";
import config from "../../config.json";

const { host, port, user, password, database } = config.database;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: host,
  port: Number(port),
  username: user,
  password: password,
  database: database,
  synchronize: true,
  logging: false,
  entities: [User],
});
