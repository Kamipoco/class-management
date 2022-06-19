import express from "express";
import {
  getStudents,
  getStudentById,
  getFilesById,
  getMyFiles,
  uploadMultipleFileLocal,
  uploadMultipleFilesCloud,
  studentJoinClass,
  studentJoinCourse,
  updateProfileStudent,
  changePassword,
  deleteStudent,
  listStudent,
  searchStudent,
} from "../controllers/student.controller";
import checkLogin from "../middlewares/checkLogin";
import upload from "../utils/multer";

const router = express.Router();

router.get("/v1/students", checkLogin, getStudents);
router.get("/v1/students/filter/search", checkLogin, searchStudent);
router.get("/v1/students/:id", checkLogin, getStudentById);

//get url images from DB or local by ID
router.get("/v1/students/files/:id", checkLogin, getFilesById);

router.get("/v1/students/my-files", checkLogin, getMyFiles);

//upload multiple files local(chua luu DB)
router.put(
  "/v1/students/uploads/multiple-files-local",
  checkLogin,
  uploadMultipleFileLocal
);

//upload multiple files cloud
router.put(
  "/v1/students/uploads/multiple-files-cloud",
  checkLogin,
  upload.array("files", 6),
  uploadMultipleFilesCloud
);

router.post("/v1/students/join-class", checkLogin, studentJoinClass);
router.post("/v1/students/join-course", checkLogin, studentJoinCourse);
router.put("/v1/students/update-profile", checkLogin, updateProfileStudent);
router.put("/v1/students/change-password", checkLogin, changePassword);
router.delete("/v1/students/remove/:id", checkLogin, deleteStudent);

//pagination & filter
router.get("/v1/student/lists", checkLogin, listStudent);

module.exports = router;
