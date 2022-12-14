import express from "express";
import cloudinary from "cloudinary";
import _ from "underscore";
import Q from "q";
import { config } from "dotenv";

config();

function upload(file) {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  return new Q.Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(file, (err, res) => {
      if (err) {
        reject(err);
      } else {
        return resolve(res.url);
      }
    });
  });
}

module.exports = { upload };
