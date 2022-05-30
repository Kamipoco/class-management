import { db } from "../config/config";
import Lecturer from "../models/lecturer.model";
import Student from "../models/student.model";
import Classroom from "../models/classroom.model";
import Course from "../models/course";

Lecturer.hasOne(Course, {
  foreignKey: "lecturer_id",
  as: "Course",
});
