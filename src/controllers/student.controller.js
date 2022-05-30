import { db } from "../config/config";
import Student from "../models/student.model";
import Classroom from "../models/classroom.model";
import Course from "../models/v1/course";

const getStudents = async (req, res, next) => {
  try {
    const students = await Student.findAll({});

    return res.status(200).json({
      msg: "success",
      datas: students,
    });
  } catch (error) {
    console.log(error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({
        msg: "Student not found",
      });
    }

    return res.status(200).json({
      msg: "success",
      datas: student,
    });
  } catch (error) {
    console.log(error);
  }
};

const add = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getStudents,
  getStudentById,
};
