import Sequelize from "sequelize";
import { db } from "../config/config";
import Student from "../models/student.model";
import Lecturer from "../models/lecturer.model";
import StudentCourse from "../models/studentcourse.model";
import Course from "../models/course.model";
import Classroom from "../models/classroom.model";
import ClassStudent from "../models/classstudent.model";

//#region Classroom
Classroom.belongsToMany(Student, {
  through: "ClassStudent",
  foreignKey: "classroom_id",
  as: "Student",
});
//#endregion

//#region Lecturer
Lecturer.hasOne(Course, {
  foreignKey: "lecturer_id",
  as: "Course",
});
//#endregion

//#region Course
Course.belongsToMany(Student, {
  through: "StudentCourse",
  as: "Student",
  foreignKey: "course_id",
});

Course.belongsTo(Lecturer, {
  foreignKey: "lecturer_id",
  as: "Lecturer",
});
//#endregion

//#region Student
Student.belongsToMany(Classroom, {
  through: "ClassStudent",
  foreignKey: "student_id",
  as: "Classroom",
});

Student.belongsToMany(Course, {
  through: "StudentCourse",
  foreignKey: "student_id",
  as: "Course",
});

//#endregion

// Student.belongsToMany(Lecturer, {
//   foreignKey: "lecturer_id",
//   as: "Lecturer",
// });
