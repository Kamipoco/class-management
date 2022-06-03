import { db } from "../config/config";
import Course from "../models/course.model";
import Lecturer from "../models/lecturer.model";
import { addCourseSchema, updateCourseSchema } from "../validations/course";

const listCourses = async (req, res, next) => {
  try {
    const lists = await Course.findAll({
      // include: [
      //   {
      //     model: Lecturer,
      //     as: "Lecturer",
      //   },
      // ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      msg: "success",
      datas: lists,
    });
  } catch (error) {
    console.log(error);
  }
};

const courseDetail = async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
      return res.status(404).json({
        error: "Course not found",
      });
    }

    return res.status(200).json({
      msg: "success",
      datas: course,
    });
  } catch (error) {
    console.log(error);
  }
};

const addCourse = async (req, res, next) => {
  try {
    const { subject_name } = req.body;
    const validation = await addCourseSchema.validateAsync(req.body);

    const course = await Course.create({
      subject_name: subject_name,
    });

    await course.save();

    return res.status(200).json({
      msg: "success",
      datas: course,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateCourse = async (req, res, next) => {
  const { subject_name, title, description } = req.body;
  const validation = await updateCourseSchema.validateAsync(req.body);

  const course = await Course.findByPk(req.params.id);

  if (!course) {
    return res.status(404).json({
      error: "Course not found",
    });
  }

  const updated = await course.update({
    subject_name: subject_name,
    title: title,
    description: description,
  });

  return res.status(200).json({
    msg: "Updated Successfully",
    datas: updated,
  });
};

const deleteCourse = async (req, res, next) => {
  try {
    const result = await Course.findByPk(req.params.id);

    if (!result) {
      return res.status(404).json({
        error: "Course not found!",
      });
    }

    await result.destroy();

    return res.status(200).json({
      msg: "Deleted Course Successfully!",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listCourses,
  addCourse,
  courseDetail,
  updateCourse,
  deleteCourse,
};
