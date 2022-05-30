import Sequelize from "sequelize";
import { db } from "../config/config";

const StudentCourse = db.define("StudentCourse", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  student_id: {
    type: Sequelize.INTEGER,
    references: {
      model: "Student",
      key: "id",
      as: "student_id",
    },
  },
  course_id: {
    type: Sequelize.INTEGER,
    references: {
      model: "Course",
      key: "id",
      as: "course_id",
    },
  },
});

module.exports = StudentCourse;
