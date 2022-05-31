import express from "express";
import { listLecturer } from "../controllers/lecturer.controller";

const router = express.Router();

router.get("/list-lecturer", listLecturer);

module.exports = router;
