import express from "express";
import {
  getStudents,
  getStudentById,
  studentJoinClass,
  studentJoinCourse,
  updateProfileStudent,
  changePassword,
  deleteStudent,
} from "../controllers/student.controller";
import checkLogin from "../middlewares/checkLogin";
import checkRoles from "../middlewares/checkRoles";

const router = express.Router();

router.get("/students", checkLogin, getStudents);
router.get("/student/:id", checkLogin, getStudentById);
router.post("/student/join-class", checkLogin, studentJoinClass);
router.post("/student/join-course", checkLogin, studentJoinCourse);
router.put("/student/update/:id", checkLogin, updateProfileStudent);
router.put("/student/change-password/:id", checkLogin, changePassword);
router.delete("/student/remove/:id", checkLogin, deleteStudent);

module.exports = router;
