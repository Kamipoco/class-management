import express from "express";
import {
  listLecturer,
  detailLecturer,
  addLecturer,
  addWithCourse,
  updateLecturer,
  deleteCourse,
} from "../controllers/lecturer.controller";

const router = express.Router();

router.get("/list-lecturer", listLecturer);
router.get("/lecturer/:id", detailLecturer);
router.post("/add-lecturer", addLecturer);
router.post("/addWithCourse", addWithCourse);
router.put("/update-lecturer/:id", updateLecturer);
router.delete("/delete-lecturer/:id", deleteCourse);

module.exports = router;
