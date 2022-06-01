import express from "express";
import {
  getStudents,
  getStudentById,
  addStudent,
} from "../controllers/student.controller";
import checkLogin from "../middlewares/checkLogin";

const router = express.Router();

router.get("/students", getStudents);
router.get("/student/:id", checkLogin, getStudentById);
router.get("/add-student", addStudent);

module.exports = router;
