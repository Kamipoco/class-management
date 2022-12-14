import path from "path";
import multer from "multer";
import { upload } from "../utils/upload";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "../Uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const maxSize = 1000000 * 1000;

const uploadMul = multer({
  storage: storage,
  limits: {
    fileSize: maxSize,
  },
});

module.exports = {
  uploadMul,
};
