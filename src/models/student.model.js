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
  classroom_id: {
    //co the tao bang trung gian Class_Student
    type: Sequelize.INTEGER,
    references: {
      model: "Classroom",
      key: "id",
      as: "classroom_id",
    },
  },
});

Student.belongsTo(Classroom, {
  foreignKey: "classroom_id",
  as: "Classroom",
});

Student.belongsToMany(Course, {
  through: "StudentCourse",
  as: "Course",
  foreignKey: "student_id",
});

module.exports = Student;
