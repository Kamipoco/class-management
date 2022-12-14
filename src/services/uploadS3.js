import fs from "fs";
import AWS from "aws-sdk";
import {
  config
} from "dotenv";
import multer from "multer"
import awsCloudFront from 'aws-cloudfront-sign';
import {
  v4 as uuidv4
} from 'uuid';

config();

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../Uploads");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4());
  },
});

var multipleUploadS3 = multer({
  storage: fileStorageEngine
}).array("files");
var uploadSingleS3 = multer({
  storage: fileStorageEngine
}).single("files");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  Bucket: process.env.BUCKET_NAME,
});

// UPLOAD FILE TO S3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: process.env.BUCKET_NAME,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}

// DOWNLOAD FILE FROM S3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: process.env.BUCKET_NAME,
  };

  return s3.getObject(downloadParams).createReadStream();
}

//DOWNLOAD FILE WITH CLOUDFRONT(CDN) S3
function getFileLink(filename) {
  return new Promise(function (resolve, reject) {
    var options = {
      keypairId: process.env.CLOUDFRONT_ACCESS_KEY_ID,
      privateKeyPath: process.env.CLOUDFRONT_PRIVATE_KEY_PATH
    };
    var signedUrl = awsCloudFront.getSignedUrl(process.env.CLOUDFRONT_URL + filename, options);
    resolve(signedUrl);
  });
}

export {
  multipleUploadS3,
  uploadFile,
  getFileStream,
  uploadSingleS3,
  getFileLink
}

// var storage = multer.memoryStorage({
//   destination: function (req, file, callback) {
//     callback(null, "../Uploads");
//   }
// });