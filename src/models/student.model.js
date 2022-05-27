import Sequelize from "sequelize";
import { db } from "../config/config";

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
});

module.exports = Student;
