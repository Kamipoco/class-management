import express from "express";
import { signUp, signIn, logOut } from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", signUp);
// router.post("/signin", signIn);
// router.post("/logout", logOut);

module.exports = router;
