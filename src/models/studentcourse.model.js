import Sequelize from "sequelize";
import { db } from "../config/config";

const StudentCourse = db.define("StudentCourse", {
  student_id: {
    type: Sequelize.INTEGER,
  },
  course_id: {
    type: Sequelize.INTEGER,
  },
});

module.exports = StudentCourse;
