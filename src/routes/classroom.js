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

router.get("/v1/classes", checkLogin, checkRoles, listClass);
router.get("/v1/classes/:id", checkLogin, checkRoles, classDetail);
router.post("/v1/classes/create", checkLogin, checkRoles, createClass);
router.put(
  "/v1/classes/update-student",
  checkLogin,
  checkRoles,
  classAddStudent
);
router.put("/v1/classes/update/:id", updateClass);
router.delete("/v1/classes/remove/:id", deleteClass);

module.exports = router;
