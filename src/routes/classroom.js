import express from "express";
import checkLogin from "../middlewares/checkLogin";
import checkRoles from "../middlewares/checkRoles";
import {
  listClass,
  classDetail,
  createClass,
  classAddStudent,
  updateClass,
  deleteClass,
} from "../controllers/classroom.controller";

const router = express.Router();

router.get("/admin/classes", checkLogin, checkRoles, listClass);
router.get("/admin/class/:id", checkLogin, checkRoles, classDetail);
router.post("/admin/class/create", checkLogin, checkRoles, createClass);
router.post(
  "/admin/class/add-student",
  checkLogin,
  checkRoles,
  classAddStudent
);
router.put("/admin/class/update/:id", updateClass);
router.delete("/admin/class/remove/:id", deleteClass);

module.exports = router;
