import express from "express";
import { list, add } from "../controllers/classroom.controller";

const router = express.Router();

router.get("/list-class", list);
router.post("/add-class", add);

module.exports = router;
