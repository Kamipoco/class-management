import fs from "fs";
import AWS from "aws-sdk";
import { config } from "dotenv";

config();

var storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});
var multipleUploadS3 = multer({ storage: storage }).array("files");
var upload = multer({ storage: storage }).single("files");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  Bucket: process.env.BUCKET_NAME,
});

module.exports = {
  multipleUploadS3,
};
