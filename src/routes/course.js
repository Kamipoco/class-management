import express from "express";
import { listCourses } from "../controllers/course.controller";

const router = express.Router();

router.get("/list-course", listCourses);

module.exports = router;
