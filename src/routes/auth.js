import express from "express";
import { signIn, signUp } from "../controllers/auth.controller";
const router = express.Router();

router.post("/signup", signUp);
// router.post("/signin", (req, res) => {
//   signIn;
// });
// router.post("/logout", logOut);

module.exports = router;
