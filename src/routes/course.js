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

router.get("/list-course", listCourses);
router.get("/course/:id", courseDetail);
router.post("/create-course", createCourse);
router.put("/add-lecturer/:id", addLecturer);
router.put("/update-course/:id", updateCourse);
router.delete("/delete-course/:id", deleteCourse);

module.exports = router;
