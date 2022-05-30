import Classroom from "../models/classroom.model";
import Student from "../models/student.model";

Classroom.hasMany(Student, {
  foreignKey: "classroom_id",
  as: "Student",
});

const list = async (req, res, next) => {};

const add = async (req, res, next) => {
  try {
    const addClass = req.body.class_name;

    const result = await Classroom.create(addClass);

    return res.status(200).json({
      msg: "success",
      datas: result,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  list,
  add,
};
