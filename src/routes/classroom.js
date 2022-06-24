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

<<<<<<< HEAD
router.get("/api/v1/classes", checkLogin, checkRoles, listClass);
router.get("/api/v1/classes/:id", checkLogin, checkRoles, classDetail);
router.post("/api/v1/classes", checkLogin, checkRoles, createClass);
router.put("/api/v1/classes", checkLogin, checkRoles, classAddStudent);
router.put("/api/v1/classes/:id", updateClass);
router.delete("/api/v1/classes/:id", deleteClass);
=======
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
>>>>>>> f722998966581b9f3a441db9d5c731bda866ffb3

module.exports = router;
