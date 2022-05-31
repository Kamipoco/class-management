import { db } from "../config/config";
import Classroom from "../models/classroom.model";
import Student from "../models/student.model";
// const Classroom = require("../models/v1/classroom").Classroom;

const list = async (req, res, next) => {
  try {
    const classes = await Classroom.findAll();

    return res.status(200).json({
      msg: "success",
      datas: classes,
    });
  } catch (error) {
    console.log(error);
  }
};

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
