import { db } from "../config/config";
import Student from "../models/student.model";
import Classroom from "../models/classroom.model";
import Course from "../models/course.model";
import ClassStudent from "../models/classstudent.model";
import StudentCourse from "../models/studentcourse.model";
import bcrypt from "bcryptjs";
import { updateProfileSchema } from "../validations/student";
import { changePasswordSchema } from "../validations/student";

const getStudents = async (req, res, next) => {
  try {
    const lists = await Student.findAll({
      include: [
        {
          model: Classroom,
          as: "Classroom",
          attributes: ["class_name"],
          // through: {
          //   model: ClassStudent,
          //   as: "ClassStudent",
          //   attributes: ["classroom_id", "student_id"],
          // },
        },
        {
          model: Course,
          as: "Course",
          attributes: ["subject_name", "title", "description"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      msg: "success",
      data: lists,
    });
  } catch (error) {
    console.log(error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: [
        {
          model: Classroom,
          as: "Classroom",
          attributes: ["class_name"],
        },
        {
          model: Course,
          as: "Course",
          attributes: ["subject_name", "title", "description"],
        },
      ],
    });

    if (!student) {
      return res.status(404).json({
        error: "Student not found",
      });
    }

    return res.status(200).json({
      msg: "Success",
      data: student,
    });
  } catch (error) {
    console.log(error);
  }
};

const studentJoinClass = async (req, res, next) => {
  try {
    const result = await ClassStudent.create({
      classroom_id: req.body.classroom_id,
      student_id: req.user.id,
    });

    await result.save();

    return res.status(200).json({
      msg: "Success",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const studentJoinCourse = async (req, res, next) => {
  try {
    const result = await StudentCourse.create({
      student_id: req.user.id,
      course_id: req.body.course_id,
    });

    await result.save();

    return res.status(200).json({
      msg: " success",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProfileStudent = async (req, res, next) => {
  const { student_name, bio } = req.body;
  const validation = await updateProfileSchema.validateAsync(req.body);

  const student = await Student.findByPk(req.params.id, {
    include: [
      {
        model: Classroom,
        as: "Classroom",
      },
      {
        model: Course,
        as: "Course",
      },
    ],
  });

  if (!student) {
    return res.status(404).json({
      error: "Student not found",
    });
  }

  const updated = await student.update({
    student_name: student_name,
    bio: bio,
  });

  return res.status(200).json({
    msg: "Updated Successfully",
    data: updated,
  });
};

const changePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  const infoStudent = await Student.findByPk(req.params.id); //req.user.id
  const isPassword = await bcrypt.compareSync(
    currentPassword,
    infoStudent.password
  );

  if (!isPassword) {
    return res.status(401).json({
      error: "Invalid Password",
    });
  }

  infoStudent.password = await bcrypt.hash(newPassword, 12);

  await infoStudent.save();

  return res.status(200).json({
    msg: "Changed Password Successfully",
  });
};

const deleteStudent = async (req, res, next) => {
  const result = await Student.findByPk(req.params.id); //req.user.id

  if (!result) {
    return res.status(404).json({
      error: "Student not found",
    });
  }

  await result.destroy();

  return res.status(200).json({
    msg: "Student deleted successfully",
  });
};

module.exports = {
  getStudents,
  getStudentById,
  studentJoinClass,
  studentJoinCourse,
  updateProfileStudent,
  changePassword,
  deleteStudent,
};
