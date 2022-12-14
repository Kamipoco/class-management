import util from "util";
import path from "path";
import multer from "multer";

//upload files local
let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../Uploads`));
  },
  filename: (req, file, callback) => {
    let filename = `${Date.now()}-dev-${file.originalname}`;
    callback(null, filename);
  },
});

let uploadManyFiles = multer({ storage: storage }).array("files", 17);

let multipleUploadService = util.promisify(uploadManyFiles);

module.exports = multipleUploadService;
