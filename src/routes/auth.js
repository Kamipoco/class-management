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
router.post("/v1/auth/signup", signUp);
router.post("/v1/auth/signin", signIn);
router.post("/v1/auth/forgot-password", forgotPassword);
router.post("/v1/auth/new-password", newPassword);

//Lecturer (Admin)
router.post("/v1/auth/admin/register", Register);
router.post("/v1/auth/admin/login", Login);
// router.post("/admin/forgot-password", forgotPassword);
// router.post("/admin/new-password", newPassword);

module.exports = router;
