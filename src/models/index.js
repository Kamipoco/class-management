import Sequelize from "sequelize";
import { db } from "../config/config";
import Student from "../models/student.model";
import Lecturer from "../models/lecturer.model";
import StudentCourse from "../models/studentcourse.model";
import Course from "../models/course.model";
import Classroom from "../models/classroom.model";

Classroom.hasMany(Student, {
  foreignKey: "classroom_id",
  as: "Student",
  sourceKey: "id",
});

Student.belongsTo(Classroom, {
  foreignKey: "classroom_id",
  as: "Student",
});

Lecturer.hasOne(Course, {
  foreignKey: "lecturer_id",
  as: "Course",
});

Student.belongsToMany(Course, {
  through: "StudentCourse",
  as: "Course",
  foreignKey: "student_id",
});

Course.belongsToMany(Student, {
  through: "StudentCourse",
  as: "Student",
  foreignKey: "course_id",
});

Course.belongsTo(Lecturer, {
  foreignKey: "lecturer_id",
  as: "lecturer",
});

Student.belongsToMany(Lecturer, {
  foreignKey: "lecturer_id",
  as: "Lecturer",
});
