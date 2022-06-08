import { db } from "../config/config";
import Classroom from "../models/classroom.model";
import Student from "../models/student.model";
import ClassStudent from "../models/classstudent.model";
import { addClassSchema, addWithStudentSchema } from "../validations/classroom";

const listClass = async (req, res, next) => {
  try {
    const lists = await Classroom.findAll({
      include: [
        // {
        //   model: Student,
        //   through: ClassStudent,
        //   as: "Student",
        //   attributes: ["student_name"],
        // },
        {
          model: Student,
          as: "Student",
          attributes: ["student_name"],
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
      data: lists,
    });
  } catch (error) {
    console.log(error);
  }
};

const classDetail = async (req, res, next) => {
  const result = await Classroom.findByPk(req.params.id, {
    include: [
      {
        model: Student,
        as: "Student",
        attributes: ["student_name", "bio"],
      },
    ],
  });

  if (!result) {
    return res.status(404).json({
      error: "Classroom not found",
    });
  }

  return res.status(200).json({
    msg: "success",
    data: result,
  });
};

const createClass = async (req, res, next) => {
  try {
    const { class_name } = req.body;
    const validation = await addClassSchema.validateAsync(req.body);

    const result = await Classroom.create({
      class_name: class_name,
    });

    return res.status(200).json({
      msg: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

//add student -> classroom
const classAddStudent = async (req, res, next) => {
  try {
    const { classroom_id, student_id } = req.body;
    const validation = await addWithStudentSchema.validateAsync(req.body);

    const result = await ClassStudent.create({
      classroom_id: classroom_id,
      student_id: student_id,
    });

    await result.save();

    return res.status(200).json({
      msg: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateClass = async (req, res, next) => {
  try {
    const { class_name, description, status } = req.body;

    const result = await Classroom.findByPk(req.params.id, {
      // include: [
      //   {
      //     model: Student,
      //     as: "Student",
      //   },
      // ],
    });

    if (!result) {
      return res.status(404).json({
        error: "Classroom not found!",
      });
    }

    const updateClass = result.update({
      class_name: class_name,
      description: description,
      status: status,
    });

    return res.status(200).json({
      msg: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteClass = async (req, res, next) => {
  try {
    const result = await Classroom.findByPk(req.params.id);

    if (!result) {
      return res.status(404).json({
        error: "Classroom not found",
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
  listClass,
  classDetail,
  createClass,
  classAddStudent,
  updateClass,
  deleteClass,
};
