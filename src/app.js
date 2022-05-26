import express from "express";
import { config } from "dotenv";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import morgan from "morgan";
import { db } from "./configs/database";
import authRoutes from "./routes/auth";

const app = express();
config();

app.use(helmet());
app.use(cors());
app.use(hpp());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./models/user.model");

app.get("/", (req, res) => {
  res.send("Test Server");
});

app.use("/", authRoutes);

app.listen(process.env.APP_PORT, async () => {
  await db.sync();
  console.log(
    `Hi, I am running at http://${process.env.APP_HOST}:${process.env.APP_PORT}/`
  );
});
