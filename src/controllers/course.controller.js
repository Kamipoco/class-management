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

const addCourse = async (req, res, next) => {
  try {
    const course = await Course.create({
      subject_name: req.body.subject_name,
    });

    await course.save();

    return res.status(200).json({
      msg: "success",
      datas: course,
    });

    // return Course
    //   .create({
    //     course_name: req.body.course_name,
    //   })
    //   .then((course) => res.status(201).send(course))
    //   .catch((error) => res.status(400).send(error));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listCourses,
  addCourse,
};
