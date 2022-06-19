import express from "express";
import checkLogin from "../middlewares/checkLogin";
import checkRoles from "../middlewares/checkRoles";
import {
  listLecturer,
  detailLecturer,
  // addLecturer,
  updateLecturer,
  deleteLecturer,
} from "../controllers/lecturer.controller";

const router = express.Router();

router.get("/v1/lecturers", checkLogin, checkRoles, listLecturer);
router.get("/v1/lecturers/:id", checkLogin, checkRoles, detailLecturer);
//create khong can ==> Sign In, Sign Up rieng cho Lecturer
// router.post("/admin/lecturer/create", checkLogin, checkRoles, addLecturer);
router.put("/v1/lecturers/update/:id", checkLogin, checkRoles, updateLecturer);
router.delete(
  "/v1/lecturers/remove/:id",
  checkLogin,
  checkRoles,
  deleteLecturer
);

module.exports = router;
