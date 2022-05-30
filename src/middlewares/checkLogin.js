const jwt = require("jsonwebtoken");
import { config } from "dotenv";
import Student from "../models/student.model";

config();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  //authorization === Bearer effqweasdjkwqiulaksqdasd
  if (!authorization) {
    res.status(401).json({ error: "You must be logged in" });
  }
  const token = authorization.replace("Bearer", "");
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in" });
    }

    console.log(">>>>>>>>>>>>>>>>>>");
    console.log(payload);
    console.log("<<<<<<<<<<<<<<<<<<");

    const { _id } = payload;
    Student.findByPk(_id).then((userData) => {
      req.user = userData;
      next();
    });

    // req.user = payload.id;
    // next();
  });
};
