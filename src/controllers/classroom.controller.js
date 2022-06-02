import { db } from "../config/config";
import Classroom from "../models/classroom.model";
import Student from "../models/student.model";
import ClassStudent from "../models/classstudent.model";

const listClass = async (req, res, next) => {
  try {
    const lists = await Classroom.findAll({
      include: [
        {
          model: Student,
          through: "ClassroomStudent",
          as: "Student",
        },
      ],
      order: [
        ["createdAt", "DESC"],
        [
          {
            model: Student,
            as: "Student",
          },
          "createdAt",
          "DESC",
        ],
      ],
    });

    return res.status(200).json({
      msg: "success",
      datas: lists,
    });
  } catch (error) {
    console.log(error);
  }
};

const addClass = async (req, res, next) => {
  try {
    const addClass = req.body.class_name;

    const result = await Classroom.create({
      class_name: addClass,
    });

    return res.status(200).json({
      msg: "success",
      datas: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const addWithStudent = async (req, res, next) => {
  try {
    const result = await Classroom.create(
      {
        class_name: req.body.class_name,
        student_id: req.body.student_id,
      },
      {
        include: [
          {
            model: Student,
            as: "Student",
          },
        ],
      }
    );

    await result.save();

    return res.status(200).json({
      msg: "success",
      datas: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateClass = async (req, res, next) => {};

const deleteClass = async (req, res, next) => {};

module.exports = {
  listClass,
  addClass,
  addWithStudent,
  updateClass,
  deleteClass,
};
