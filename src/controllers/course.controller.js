import { db } from "../config/config";
import Course from "../models/course.model";
import Lecturer from "../models/lecturer.model";
import Student from "../models/student.model";
import { addCourseSchema, updateCourseSchema } from "../validations/course";
import { testConvertCourses } from "../services/converJsonCourses";

const listCourses = async (req, res, next) => {
  try {
    const { download } = req.query;

    const courses = await Course.findAll({
      include: [
        {
          model: Lecturer,
          as: "Lecturer",
          attributes: ["lecturer_name", "bio"],
        },
        {
          model: Student,
          as: "Student",
          attributes: ["student_name", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    //convert json
    if (download === "true") {
      const result = await testConvertCourses(courses);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "courses.xlsx"
      );

      res.send(result);
      res.end();
      return res;
    } else {
      return res.status(200).json({
        msg: "success",
        data: courses,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const courseDetail = async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [
        {
          model: Lecturer,
          as: "Lecturer",
          attributes: ["lecturer_name", "bio"],
        },
        {
          model: Student,
          as: "Student",
          attributes: ["student_name", "email"],
        },
      ],
    });

    if (!course) {
      return res.status(404).json({
        error: "Course not found",
      });
    }

    return res.status(200).json({
      msg: "success",
      data: course,
    });
  } catch (error) {
    console.log(error);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const { subject_name } = req.body;
    const validation = await addCourseSchema.validateAsync(req.body);

    const course = await Course.create({
      subject_name: subject_name,
    });

    await course.save();

    return res.status(200).json({
      msg: "success",
      data: course,
    });
  } catch (error) {
    console.log(error);
  }
};

const addLecturer = async (req, res, next) => {
  const course = await Course.findByPk(req.params.id, {
    include: [
      {
        model: Lecturer,
        as: "Lecturer",
        attributes: ["lecturer_name", "bio"],
      },
    ],
  });

  if (!course) {
    return res.status(404).json({
      error: "Course not found!",
    });
  }

  const result = await course.update(
    {
      lecturer_id: req.body.lecturer_id,
    },
    {
      include: [
        {
          model: Lecturer,
          as: "Lecturer",
          attributes: ["lecturer_name", "bio"],
        },
      ],
    }
  );

  await result.save();

  return res.status(200).json({
    msg: "success",
    data: course,
  });
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
    msg: "success",
    data: updated,
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
      msg: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listCourses,
  courseDetail,
  createCourse,
  addLecturer,
  updateCourse,
  deleteCourse,
};
