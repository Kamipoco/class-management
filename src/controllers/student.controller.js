import { db } from "../config/config";
import Student from "../models/student.model";
import Classroom from "../models/classroom.model";
import Course from "../models/course.model";
import ClassStudent from "../models/classstudent.model";
import bcrypt from "bcryptjs";
import { updateProfileSchema } from "../validations/student";
import { changePasswordSchema } from "../validations/student";

const getStudents = async (req, res, next) => {
  try {
    //phai include them model Course
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
      ],
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

const getStudentById = async (req, res, next) => {
  try {
    //them include Course
    const student = await Student.findByPk(req.params.id, {
      include: [
        {
          model: Classroom,
          as: "Classroom",
          attributes: ["class_name"],
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
      student_id: req.body.student_id, //nen add student_name
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

const addCourse = async (req, res, next) => {
  // return Student
  // .findByPk(req.body.student_id, {
  //   include: [{
  //     model: Classroom,
  //     as: 'classroom'
  //   },{
  //     model: Course,
  //     as: 'courses'
  //   }],
  // })
  // .then((student) => {
  //   if (!student) {
  //     return res.status(404).send({
  //       message: 'Student Not Found',
  //     });
  //   }
  //   Course.findByPk(req.body.course_id).then((course) => {
  //     if (!course) {
  //       return res.status(404).send({
  //         message: 'Course Not Found',
  //       });
  //     }
  //     student.addCourse(course);
  //     return res.status(200).send(student);
  //   })
  // })
};

const updateProfileStudent = async (req, res, next) => {
  const { student_name, bio } = req.body;
  const validation = await updateProfileSchema.validateAsync(req.body);

  //include them model Course
  const student = await Student.findByPk(req.params.id, {
    include: [
      {
        model: Classroom,
        as: "Classroom",
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
    datas: updated,
  });
};

const changePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const validation = await changePasswordSchema.validateAsync(req.body);

  const infoStudent = await Student.findByPk(req.params.id);
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
  const result = await Student.findByPk(req.params.id);

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
  addStudent,
  addCourse,
  updateProfileStudent,
  changePassword,
  deleteStudent,
};
