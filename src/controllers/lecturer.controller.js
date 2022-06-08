import { db } from "../config/config";
import Lecturer from "../models/lecturer.model";
import Course from "../models/course.model";
import { exportStudentsToExcel } from "../services/convertJson";
import {
  addLecturerSchema,
  addWithCourseSchema,
  updateLecturerSchema,
} from "../validations/lecturer";

const listLecturer = async (req, res, next) => {
  try {
    // const { download } = req.query;
    const lists = await Lecturer.findAll({
      include: [
        {
          model: Course,
          as: "Course",
          attributes: ["subject_name", "title", "description"],
        },
      ],
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["password"],
      },
    });

    //function parsing json to excel file

    //res setHeader
    //res set Content type
    //data = res.body

    return res.status(200).json({
      msg: "success",
      data: lists,
    });
  } catch (error) {
    console.log(error);
  }
};

const detailLecturer = async (req, res, next) => {
  try {
    const lecturer = await Lecturer.findByPk(req.params.id, {
      include: [
        {
          model: Course,
          as: "Course",
          attributes: ["subject_name", "title", "description"],
        },
      ],
      attributes: {
        exclude: ["password"],
      },
    });

    if (!lecturer) {
      return res.status(404).json({
        error: "Lecturer not found",
      });
    }

    return res.status(200).json({
      msg: "Success",
      data: lecturer,
    });
  } catch (error) {
    console.log(error);
  }
};

const addLecturer = async (req, res, next) => {
  try {
    const validation = await addLecturerSchema.validateAsync(req.body);

    const lecturer = await Lecturer.create({
      lecturer_name: req.body.lecturer_name,
    });

    await lecturer.save();

    return res.status(200).json({
      msg: "success",
      data: lecturer,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateLecturer = async (req, res, next) => {
  try {
    const { lecturer_name, bio } = req.body;
    const validation = await updateLecturerSchema.validateAsync(req.body);

    const result = await Lecturer.findByPk(req.params.id, {
      // include: [
      //   {
      //     model: Course,
      //     as: "Course",
      //   },
      // ],
      attributes: {
        exclude: ["password"],
      },
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
      msg: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteLecturer = async (req, res, next) => {
  try {
    const result = await Lecturer.findByPk(req.params.id);

    if (!result) {
      return res.status(404).json({
        error: "Not found",
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
  listLecturer,
  detailLecturer,
  addLecturer,
  updateLecturer,
  deleteLecturer,
};
