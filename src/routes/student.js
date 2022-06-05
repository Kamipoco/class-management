import express from "express";
import {
  getStudents,
  getStudentById,
  addStudent,
  addCourse,
  updateProfileStudent,
  changePassword,
  deleteStudent,
} from "../controllers/student.controller";
import checkLogin from "../middlewares/checkLogin";
import checkRoles from "../middlewares/checkRoles";

const router = express.Router();

router.get("/students", checkLogin, getStudents);
router.get("/student/:id", checkLogin, checkRoles, getStudentById);
router.post("/add-student", checkLogin, checkRoles, addStudent);
router.put("/add-course", checkLogin, checkRoles, addCourse);
router.put("/update-student/:id", checkLogin, checkRoles, updateProfileStudent);
router.put("/change-password/:id", checkLogin, checkRoles, changePassword);
router.delete("/delete-student/:id", checkLogin, checkRoles, deleteStudent);

module.exports = router;
