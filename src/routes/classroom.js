import express from "express";
import checkLogin from "../middlewares/checkLogin";
import {
  listClass,
  addClass,
  addWithStudent,
  updateClass,
  deleteClass,
} from "../controllers/classroom.controller";

const router = express.Router();

router.get("/list-class", listClass);
router.post("/add-class", addClass);
router.post("/add-with-student", addWithStudent);
router.put("/update-class/:id", updateClass);
router.delete("/delete-class/:id", deleteClass);

module.exports = router;
