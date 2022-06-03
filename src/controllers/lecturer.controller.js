import { db } from "../config/config";
import Lecturer from "../models/lecturer.model";
import Course from "../models/course.model";

const listLecturer = async (req, res, next) => {
  try {
    const lists = await Lecturer.findAll({
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

const detailLecturer = async (req, res, next) => {
  try {
    const lecturer = await Lecturer.findByPk(req.params.id);

    if (!lecturer) {
      return res.status(404).json({
        error: "Lecturer not found",
      });
    }

    return res.status(200).json({
      msg: "Success",
      datas: lecturer,
    });
  } catch (error) {
    console.log(error);
  }
};

const addLecturer = async (req, res, next) => {
  try {
    const lecturer = await Lecturer.create({
      lecturer_name: req.body.lecturer_name,
    });

    await lecturer.save();

    return res.status(200).json({
      msg: "success",
      datas: lecturer,
    });
  } catch (error) {
    console.log(error);
  }
};

const addWithCourse = async (req, res, next) => {
  try {
    const { lecturer_name, subject_name } = req.body;
    const result = await Lecturer.create(
      {
        lecturer_name: lecturer_name,
        subject_name: subject_name,
      },
      {
        include: [
          {
            model: Course,
            as: "Course",
          },
        ],
      }
    );

    return res.status(200).json({
      msg: "success",
      datas: result,
    });
  } catch (error) {
    console.log();
  }
};

const updateLecturer = async (req, res, next) => {
  try {
    const { lecturer_name, bio } = req.body;

    const result = await Lecturer.findByPk(req.params.id, {
      include: [
        {
          model: Course,
          as: "Course",
        },
      ],
    });

    if (!result) {
      return res.status(404).json({
        error: "Not found!",
      });
    }

    const updated = await result.update({
      lecturer_name: lecturer_name,
      bio: bio,
    });

    return res.status(200).json({
      msg: "Updated successfully!",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const result = await Lecturer.findByPk(req.params.id);

    if (!result) {
      return res.status(404).json({
        error: "not found",
      });
    }

    await result.destroy();

    return res.status(200).json({
      msg: "Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listLecturer,
  detailLecturer,
  addLecturer,
  addWithCourse,
  updateLecturer,
  deleteCourse,
};
