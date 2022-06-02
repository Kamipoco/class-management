import express from "express";
import { listLecturer, addLecturer } from "../controllers/lecturer.controller";

const router = express.Router();

router.get("/list-lecturer", listLecturer);
router.post("/add-lecturer", addLecturer);

module.exports = router;
