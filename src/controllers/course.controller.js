import { db } from "../config/config";
import Course from "../models/course.model";

const listCourses = async (req, res, next) => {
  try {
    const lists = await Course.findAll({});

    return res.status(200).json({
      msg: "success",
      datas: lists,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listCourses,
};
