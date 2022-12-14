const jwt = require("jsonwebtoken");
import { config } from "dotenv";
import Lecturer from "../../models/lecturer.model";

config();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  //authorization === Bearer effqweasdjkwqiulaksqdasd
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  // const token = accessToken.replace("Bearer", "");
  jwt.verify(authorization, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in" });
    }

    const { id } = decoded.payload;
    console.log(decoded.payload);

    Student.findByPk(id).then((lecturerData) => {
      req.user = lecturerData;
      next();
    });
  });
};
