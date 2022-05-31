import { db } from "../config/config";
import Lecturer from "../models/lecturer.model";

const listLecturer = async (req, res, next) => {
  try {
    const lists = await Lecturer.findAll({});

    return res.status(200).json({
      msg: "success",
      datas: lists,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listLecturer,
};
