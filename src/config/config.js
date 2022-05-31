import { config } from "dotenv";
import { Sequelize } from "sequelize";
// import Student from "../models/student.model";
// import Lecturer from "../models/lecturer.model";
// import StudentCourse from "../models/studentcourse.model";
// import Course from "../models/course.model";
// import Classroom from "../models/classroom.model";

config();

export const db = new Sequelize(
  process.env.DB_NAME || "test",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "Aa112233@!",
  {
    dialect: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: 5432,
  }
);

//define
// const ClassroomModel = Classroom(sequelize, Sequelize);
// const StudentModel = Student(sequelize, Sequelize);
// const CourseModel = Course(sequelize, Sequelize);
// const LecturerModel = Lecturer(sequelize, Sequelize);
// const StudentCourseModel = sequelize.define("StudentCourse", {});

// ClassroomModel.hasMany(StudentModel, {
//   foreignKey: "classroom_id",
//   as: "student",
//   sourceKey: "id",
// });

// StudentModel.belongsTo(ClassroomModel, {
//   foreignKey: "classroom_id",
//   as: "student",
// });

// LecturerModel.hasOne(CourseModel, {
//   foreignKey: "lecturer_id",
//   as: "course",
// });

// StudentModel.belongsToMany(CourseModel, {
//   through: "StudentCourseModel",
//   as: "course",
//   foreignKey: "student_id",
// });

// CourseModel.belongsToMany(StudentModel, {
//   through: "StudentCourse",
//   as: "student",
//   foreignKey: "course_id",
// });

// CourseModel.belongsTo(LecturerModel, {
//   foreignKey: "lecturer_id",
//   as: "lecturer",
// });

// StudentModel.belongsToMany(LecturerModel, {
//   foreignKey: "lecturer_id",
//   as: "lecturer",
// });

db.authenticate()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));
