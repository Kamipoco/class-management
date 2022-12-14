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
  getFileStreamS3,
  downloadFileCloudFront
} from "../controllers/student.controller";
import checkLogin from "../middlewares/checkLogin";
import upload from "../utils/multer";
import {
  multipleUploadS3
} from "../services/uploadS3"

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

//====================================================================================
//upload multiple files cloud (S3)
router.put(
  "/api/v1/students/uploads/cloudS3",
  // checkLogin,
  multipleUploadS3,
  uploadMultipleFileCloudS3
);
//Get file stream S3
router.get("/api/v1/students/get-file/cloudS3/:key",
  checkLogin,
  getFileStreamS3)
//Get file with cloudfront S3
router.get("/api/v1/students/get-file/cloudfront", checkLogin, downloadFileCloudFront)

//=======================================================================================

router.post("/api/v1/students/join-class", checkLogin, studentJoinClass);
router.post("/api/v1/students/join-course", checkLogin, studentJoinCourse);
router.put("/api/v1/students", checkLogin, updateProfileStudent);
router.put("/api/v1/students/change-password", checkLogin, changePassword);
router.delete("/api/v1/students/:id", checkLogin, deleteStudent);

//pagination & filter
router.get("/v1/student/lists", listStudent);

module.exports = router;