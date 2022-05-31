import express from "express";
import { config } from "dotenv";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import morgan from "morgan";
import { db } from "./config/config";
import AuthRoutes from "./routes/auth";
import StudentRoutes from "./routes/student";
import ClassRoutes from "./routes/classroom";
import CourseRoutes from "./routes/course";
import LecturerRoutes from "./routes/lecturer";

const app = express();
config();

app.use(helmet());
app.use(cors());
app.use(hpp());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", AuthRoutes);
app.use("/", StudentRoutes);
app.use("/", ClassRoutes);
app.use("/", CourseRoutes);
app.use("/", LecturerRoutes);

app.listen(process.env.APP_PORT, async () => {
  await db.sync();
  console.log(
    `Hi, I am running at http://${process.env.APP_HOST}:${process.env.APP_PORT}/`
  );
});
