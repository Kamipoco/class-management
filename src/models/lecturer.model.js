import Sequelize from "sequelize";
import { db } from "../config/config";
import Course from "../models/course.model";

const Lecturer = db.define("Lecturer", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  lecturer_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bio: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
  role: {
    type: Sequelize.STRING,
    defaultValue: "lecturer",
  },
});

// Lecturer.hasOne(Course, {
//   foreignKey: "lecturer_id",
//   as: "course",
// });

module.exports = Lecturer;
