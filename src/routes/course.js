import express from "express";
import {
  listCourses,
  addCourse,
  courseDetail,
  updateCourse,
} from "../controllers/course.controller";

const router = express.Router();

router.get("/list-course", listCourses);
router.get("/course/:id", courseDetail);
router.post("/add-course", addCourse);
router.put("/update-course/:id", updateCourse);

module.exports = router;
