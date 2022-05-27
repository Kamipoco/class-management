import express from "express";
import { getStudents, getStudentById } from "../controllers/student.controller";

const router = express.Router();

router.get("/students", getStudents);
router.get("/student/:id", getStudentById);

module.exports = router;
