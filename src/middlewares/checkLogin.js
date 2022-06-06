const jwt = require("jsonwebtoken");
import { config } from "dotenv";
import Student from "../models/student.model";
import Lecturer from "../models/lecturer.model";

config();

module.exports = (req, res, next) => {
  // const str = req.originalUrl;
  const { authorization } = req.headers;

  //authorization === Bearer effqweasdjkwqiulaksqdasd
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  // const token = accessToken.replace("Bearer", "");
  jwt.verify(authorization, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in" });
    }

    const { id, role } = decoded.payload;

    if (role === "lecturer") {
      Lecturer.findByPk(id).then((userData) => {
        req.user = userData;
        next();
      });
    } else {
      Student.findByPk(id).then((userData) => {
        req.user = userData;
        next();
      });
    }
  });
};
