import express from "express";
import {
  listLecturer,
  addLecturer,
  addWithCourse,
  updateLecturer,
} from "../controllers/lecturer.controller";

const router = express.Router();

router.get("/list-lecturer", listLecturer);
router.get("/lecturer/:id");
router.post("/add-lecturer", addLecturer);
router.post("/addWithCourse", addWithCourse);
router.put("/update-lecturer/:id", updateLecturer);

module.exports = router;
