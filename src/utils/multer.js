import multer from "multer";
import path from "path";

module.exports = multer({
  storage: multer.diskStorage({}),

  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);

    console.log(file.originalname);

    if (ext.includes(".png") === false || ext.includes(".jpg") === false) {
      cb(new Error("File type is not supported"), false);
      return;
    }

    cb(null, true);
  },
});
