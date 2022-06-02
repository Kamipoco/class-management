const jwt = require("jsonwebtoken");
import { config } from "dotenv";
import Student from "../models/student.model";

config();

module.exports = (req, res, next) => {
  const { role } = req.user;

  if (role !== "student") {
    return res.status(403).json({
      error: "Permission Denied",
    });
  }
  next();
};
