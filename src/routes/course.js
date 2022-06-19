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

router.get("/v1/courses", listCourses);
router.get("/v1/courses/:id", courseDetail);
router.post("/v1/courses/create", createCourse);
router.put("/v1/courses/update-lecturer/:id", addLecturer);
router.put("/v1/courses/update/:id", updateCourse);
router.delete("/v1/courses/remove/:id", deleteCourse);

module.exports = router;
