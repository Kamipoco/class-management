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

router.get("/admin/courses", listCourses);
router.get("/admin/course/:id", courseDetail);
router.post("/admin/course/create", createCourse);
router.put("/admin/course/update-lecturer/:id", addLecturer);
router.put("/admin/course/update-course/:id", updateCourse);
router.delete("/admin/course/remove/:id", deleteCourse);

module.exports = router;
