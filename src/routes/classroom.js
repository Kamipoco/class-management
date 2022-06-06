import express from "express";
import checkLogin from "../middlewares/checkLogin";
import {
  listClass,
  classDetail,
  createClass,
  classAddStudent,
  updateClass,
  deleteClass,
} from "../controllers/classroom.controller";

const router = express.Router();

router.get("/list-class", listClass);
router.get("/class-detail/:id", classDetail);
router.post("/add-class", createClass);
router.post("/add-with-student", classAddStudent);
router.put("/update-class/:id", updateClass);
router.delete("/delete-class/:id", deleteClass);

module.exports = router;
