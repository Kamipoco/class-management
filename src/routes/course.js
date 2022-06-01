import express from "express";
import { listCourses, addCourse } from "../controllers/course.controller";

const router = express.Router();

router.get("/list-course", listCourses);
router.post("/add-course", addCourse);

module.exports = router;
