import { db } from "../config/config";
import Student from "../models/student.model";
import Classroom from "../models/classroom.model";
import Course from "../models/course.model";
import ClassStudent from "../models/classstudent.model";

const getStudents = async (req, res, next) => {
  try {
    //   return Student
    // .findAll({
    //   include: [{
    //     model: Classroom,
    //     as: 'classroom'
    //   },{
    //     model: Course,
    //     as: 'courses'
    //   }],
    //   order: [
    //     ['createdAt', 'DESC'],
    //     [{ model: Course, as: 'courses' }, 'createdAt', 'DESC'],
    //   ],
    // })
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

const addStudent = async (req, res, next) => {
  try {
    const result = await ClassStudent.create({
      classroom_id: req.body.classroom_id,
      student_id: req.body.student_id,
    });

    await result.save();

    return res.status(200).json({
      msg: "Success",
      datas: result,
    });
  } catch (error) {
    console.log(error);
  }
};

// add(req, res) {
//   return Student
//     .create({
//       classroom_id: req.body.classroom_id,
//       student_name: req.body.student_name,
//     })
//     .then((student) => res.status(201).send(student))
//     .catch((error) => res.status(400).send(error));
// },

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
};
