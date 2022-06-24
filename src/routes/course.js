import express from "express";
import {
  listCourses,
  courseDetail,
  createCourse,
  addLecturer,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller";

const router = express.Router();

router.get("/api/v1/courses", listCourses);
router.get("/api/v1/courses/:id", courseDetail);
router.post("/api/v1/courses", createCourse);
router.put("/api/v1/courses/update-lecturer/:id", addLecturer);
router.put("/api/v1/courses/:id", updateCourse);
router.delete("/api/v1/courses/:id", deleteCourse);

module.exports = router;
