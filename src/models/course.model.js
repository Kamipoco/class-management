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
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lecturer_id: {
    //nen lưu id vào bảng nối giữa lecturer-course để trường hợp năm nay lecturer đảm nhận course và năm sau lại đảm nhận course khác với id khác
    type: Sequelize.INTEGER,
    references: {
      model: "Lecturer",
      key: "id",
      as: "lecturer_id",
    },
  },
});

// Course.belongsToMany(Student, {
//   through: "StudentCourse",
//   as: "Student",
//   foreignKey: "course_id",
// });

// Student.belongsToMany(Lecturer, {
//   foreignKey: "lecturer_id",
//   as: "Lecturer",
// });

module.exports = Course;
