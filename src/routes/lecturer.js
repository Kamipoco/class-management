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

router.get("/admin/lecturers", checkLogin, checkRoles, listLecturer);
router.get("/admin/lecturer/:id", checkLogin, checkRoles, detailLecturer);
//create khong can ==> Sign In, Sign Up rieng cho Lecturer
// router.post("/admin/lecturer/create", checkLogin, checkRoles, addLecturer);
router.put(
  "/admin/lecturer/update/:id",
  checkLogin,
  checkRoles,
  updateLecturer
);
router.delete(
  "/admin/lecturer/remove/:id",
  checkLogin,
  checkRoles,
  deleteLecturer
);

module.exports = router;
