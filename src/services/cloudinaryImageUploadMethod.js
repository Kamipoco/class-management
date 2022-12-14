import cloudinary from "../utils/cloudinary";

//upload files cloudinary
const cloudinaryImageUploadMethod = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (err, res) => {
      if (err) {
        console.log(err.message);
        // return res.status(500).send("upload error");
      }

      resolve({
        url: res.secure_url,
      });
    });
  });
};

module.exports = {
  cloudinaryImageUploadMethod,
};
