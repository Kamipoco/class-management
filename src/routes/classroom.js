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

router.get("/api/v1/classes", checkLogin, checkRoles, listClass);
router.get("/api/v1/classes/:id", checkLogin, checkRoles, classDetail);
router.post("/api/v1/classes", checkLogin, checkRoles, createClass);
router.put("/api/v1/classes", checkLogin, checkRoles, classAddStudent);
router.put("/api/v1/classes/:id", updateClass);
router.delete("/api/v1/classes/:id", deleteClass);

module.exports = router;
