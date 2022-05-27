import Sequelize from "sequelize";
import { db } from "../config/config";

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
    allowNull: false,
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Classroom;
