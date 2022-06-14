import express from "express";
import {
  getStudents,
  getStudentById,
  getFilesById,
  getMyFiles,
  uploadMultipleFileLocal,
  uploadMultipleFilesCloud,
  uploadMultipleFileCloudS3,
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

router.get("/students", checkLogin, getStudents);
router.get("/students/search", checkLogin, searchStudent);
router.get("/student/:id", checkLogin, getStudentById);

//get url images from DB or local by ID
router.get("/student/files/:id", checkLogin, getFilesById);

router.get("/student/my-files/:id", checkLogin, getMyFiles);

//upload multiple files local
router.put(
  "/student/upload-multiple-local",
  checkLogin,
  uploadMultipleFileLocal
);

//upload multiple files cloud (Cloudinary)
router.put(
  "/student/upload-multiple-cloud",
  checkLogin,
  upload.array("files", 6),
  uploadMultipleFilesCloud
);

//upload multiple files cloud (S3)
router.put(
  "/student/upload-multiple-cloud-s3",
  checkLogin,
  uploadMultipleFileCloudS3
);

router.post("/student/join-class", checkLogin, studentJoinClass);
router.post("/student/join-course", checkLogin, studentJoinCourse);
router.put("/student/update/:id", checkLogin, updateProfileStudent);
router.put("/student/change-password/:id", checkLogin, changePassword);
router.delete("/student/remove/:id", checkLogin, deleteStudent);

//pagination & filter
router.get("/lists", checkLogin, listStudent);

module.exports = router;
