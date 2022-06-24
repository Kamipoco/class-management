import Sequelize from "sequelize";
import { db } from "../config/config";

const ClassStudent = db.define("ClassStudent", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  classroom_id: {
    type: Sequelize.INTEGER,
  },
  student_id: {
    type: Sequelize.INTEGER,
  },
});

module.exports = ClassStudent;
