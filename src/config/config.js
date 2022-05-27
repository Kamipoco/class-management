import { config } from "dotenv";
import { Sequelize } from "sequelize";

config();

export const db = new Sequelize(
  process.env.DB_NAME || "classroom-management",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "Vanlam@020499",
  {
    dialect: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: 5432,
  }
);

db.authenticate()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));
