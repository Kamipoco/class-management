import Sequelize from "sequelize";
import { db } from "../configs/database";

const Course = db.define(
  "Course",
  {
    subjectName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
    },
    idOwner: {
      type: Sequelize.INTEGER,
      references: {
        model: "User",
        key: "id",
        as: "idOwner",
      },
    },
    classId: {
      type: Sequelize.INTEGER,
      references: {
        model: "Class",
        key: "id",
        as: "classId",
      },
    },
    description: {
      type: Sequelize.STRING,
    },
  },
  {}
);

module.exports = Course;
