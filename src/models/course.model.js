import Sequelize from "sequelize";
import { db } from "../config/config";
import Student from "../models/student.model";
import Lecturer from "../models/lecturer.model";
import StudentCourse from "../models/studentcourse.model";

const Course = db.define("Course", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  subject_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
  description: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
  lecturer_id: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Course;
