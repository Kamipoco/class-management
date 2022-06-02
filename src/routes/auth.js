import express from "express";
import {
  signIn,
  signUp,
  forgotPassword,
  newPassword,
  updatePRofile,
} from "../controllers/auth.controller";
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/forgot-password", forgotPassword);
router.post("/new-password", newPassword);
router.put("/update-profile", updatePRofile);

module.exports = router;
