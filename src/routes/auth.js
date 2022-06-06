import express from "express";
import {
  signIn,
  signUp,
  forgotPassword,
  newPassword,
  Register,
  Login,
} from "../controllers/auth.controller";
const router = express.Router();

//Student
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/forgot-password", forgotPassword);
router.post("/new-password", newPassword);

//Lecturer (Admin)
router.post("/admin/signup", Register);
router.post("/admin/signin", Login);
// router.post("/admin/forgot-password", forgotPassword);
// router.post("/admin/new-password", newPassword);

module.exports = router;
