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
router.post("/join-class", checkLogin, checkRoles, studentJoinClass);
router.post("/join-course", checkLogin, checkRoles, studentJoinCourse);
router.put("/update-student/:id", checkLogin, checkRoles, updateProfileStudent);
router.put("/change-password/:id", checkLogin, checkRoles, changePassword);
router.delete("/delete-student/:id", checkLogin, checkRoles, deleteStudent);

module.exports = router;
