import cloudinary from "../utils/cloudinary";

const cloudinaryImageUploadMethod = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (err, res) => {
      if (err) return res.status(500).send("upload error");
      resolve({
        res: res.secure_url,
      });
    });
  });
};

module.exports = {
  cloudinaryImageUploadMethod,
};
