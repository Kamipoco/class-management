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

// const router = new Router({
//   prefix: "/v1/auth",
// });

//Student
router.post("/api/v1/auth/create", signUp);
router.post("/api/v1/auth/login", signIn);
router.post("/api/v1/auth/forgot-password", forgotPassword);
router.post("/api/v1/auth/new-password", newPassword);

//Lecturer (Admin)
router.post("/api/v1/auth/admin/create", Register);
router.post("/api/v1/auth/admin/login", Login);
// router.post("/admin/forgot-password", forgotPassword);
// router.post("/admin/new-password", newPassword);

module.exports = router;
