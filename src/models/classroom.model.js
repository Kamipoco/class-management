import Sequelize from "sequelize";
import { db } from "../config/config";
import Student from "../models/student.model";

const Classroom = db.define("Classroom", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  class_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

// Classroom.hasMany(Student, {
//   foreignKey: "classroom_id",
//   as: "Student",
//   sourceKey: "id",
// });

module.exports = Classroom;
