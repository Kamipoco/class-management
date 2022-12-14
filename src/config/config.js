import { config } from "dotenv";
import { Sequelize } from "sequelize";

config();

export const db = new Sequelize(
  process.env.DB_NAME || "test",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "Aa112233@!",
  {
    dialect: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: 5432,
    logging: false,
  }
);

require("../models/index");

db.authenticate()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));
