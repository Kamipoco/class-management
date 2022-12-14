import express from "express";
import checkLogin from "../middlewares/checkLogin";
import checkRoles from "../middlewares/checkRoles";
import {
  listLecturer,
  detailLecturer,
  updateLecturer,
  deleteLecturer,
} from "../controllers/lecturer.controller";

const router = express.Router();

router.get("/api/v1/lecturers", checkLogin, checkRoles, listLecturer);
router.get("/api/v1/lecturers/:id", checkLogin, checkRoles, detailLecturer);
router.put("/api/v1/lecturers/:id", checkLogin, checkRoles, updateLecturer);
router.delete("/api/v1/lecturers/:id", checkLogin, checkRoles, deleteLecturer);

module.exports = router;
