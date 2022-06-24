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

router.get("/api/v1/students", checkLogin, getStudents);
router.get("/api/v1/students/filter/search", checkLogin, searchStudent);
router.get("/api/v1/students/:id", checkLogin, getStudentById);

//get url images from DB or local by ID
router.get("/api/v1/students/files/:id", checkLogin, getFilesById);

// router.get("/student/my-files/:id", checkLogin, getMyFiles);

//upload multiple files local
router.put(
  "/api/v1/students/uploads/local",
  checkLogin,
  uploadMultipleFileLocal
);

//upload multiple files cloud (Cloudinary)
router.put(
  "/api/v1/students/uploads/cloud",
  checkLogin,
  upload.array("files", 6),
  uploadMultipleFilesCloud
);

//upload multiple files cloud (S3)
router.put(
  "/api/v1/students/uploads/cloudS3",
  checkLogin,
  uploadMultipleFileCloudS3
);

router.post("/api/v1/students/join-class", checkLogin, studentJoinClass);
router.post("/api/v1/students/join-course", checkLogin, studentJoinCourse);
router.put("/api/v1/students", checkLogin, updateProfileStudent);
router.put("/api/v1/students/change-password", checkLogin, changePassword);
router.delete("/api/v1/students/:id", checkLogin, deleteStudent);

//pagination & filter
router.get("/v1/student/lists", checkLogin, listStudent);

module.exports = router;
