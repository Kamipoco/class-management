import { db } from "../config/config";
import Student from "../models/student.model";
import Classroom from "../models/classroom.model";
import Course from "../models/course";
import Lecturer from "../models/lecturer.model";

// Course.bolongsToMany(Student, {
//   through: "StudentCourse",
//   as: "Student",
//   foreignKey: "course_id",
// });

// Student.bolongsToMany(Lecturer, {
//   foreignKey: "lecturer_id",
//   as: "lecturer",
// });
