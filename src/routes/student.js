import express from "express";
import {
  getStudents,
  getStudentById,
  getImages,
  uploadSingleFileImage,
  uploadMultipleFile,
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
import checkRoles from "../middlewares/checkRoles";
import { uploadMul } from "../services/uploadFile";
import upload from "../utils/multer";

const router = express.Router();

router.get("/students", checkLogin, getStudents);
router.get("/students/search", checkLogin, searchStudent);
router.get("/student/:id", checkLogin, getStudentById);

//get url images from DB or local
router.get("/student/get-images", checkLogin, getImages);

//upload multiple files local
router.post("/student/upload-multiple-local", checkLogin, uploadMultipleFile);

//upload multiple files local
router.post(
  "/student/upload-multiple-cloud",
  checkLogin,
  uploadMultipleFilesCloud
);

router.post("/student/join-class", checkLogin, studentJoinClass);
router.post("/student/join-course", checkLogin, studentJoinCourse);
router.put("/student/update/:id", checkLogin, updateProfileStudent);
router.put("/student/change-password/:id", checkLogin, changePassword);
router.delete("/student/remove/:id", checkLogin, deleteStudent);

//pagination & filter
router.get("/lists", checkLogin, listStudent);
//upload single file image
router.post(
  "/student/upload",
  checkLogin,
  upload.single("url"),
  uploadSingleFileImage
);

module.exports = router;
