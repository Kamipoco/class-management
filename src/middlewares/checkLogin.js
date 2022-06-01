const jwt = require("jsonwebtoken");
import { config } from "dotenv";
import Student from "../models/student.model";

config();

module.exports = (req, res, next) => {
  const { accessToken } = req.headers;

  //authorization === Bearer effqweasdjkwqiulaksqdasd
  if (!accessToken) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  // const token = authorization.replace("Bearer", "");
  jwt.verify(accessToken, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in" });
    }

    const { id } = decoded.payload;
    Student.findByPk(id).then((userData) => {
      req.user = userData;
      next();
    });
  });
};
