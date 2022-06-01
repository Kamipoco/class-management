import Sequelize from "sequelize";
import { db } from "../config/config";
import Classroom from "../models/classroom.model";
import Course from "../models/course.model";
import StudentCourse from "../models/studentcourse.model";

const Student = db.define("Student", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  student_name: {
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
    defaultValue: "student",
  },
  resetToken: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
  expireToken: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

// Student.belongsTo(Classroom, {
//   foreignKey: "student_id",
//   as: "classroom",
// });

// Student.belongsToMany(Course, {
//   through: "StudentCourse",
//   as: "course",
//   foreignKey: "student_id",
// });

module.exports = Student;
