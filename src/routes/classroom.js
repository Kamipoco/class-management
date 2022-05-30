import express from "express";
import { list, add } from "../controllers/classroom.controller";

const router = express.Router();

router.post("/add", add);

module.exports = router;
