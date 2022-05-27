import { db } from "../config/config";
import Student from "../models/student.model";

const getStudents = async (req, res, next) => {
  try {
    const students = await Student.findAll({});

    return res.status(200).json({ students });
  } catch (error) {
    console.log(error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    return res.status(200).json({ student });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getStudents,
  getStudentById,
};
