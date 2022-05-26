import Sequelize from "sequelize";
import { db } from "../configs/database";

const Class = db.define(
  "Class",
  {
    className: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      default: "",
    },
    classOwner: {
      type: Sequelize.STRING,
      references: {
        model: "User",
        key: "id",
        as: "classOwner",
      },
    },
    capacity: {
      type: Sequelize.ARRAY,
      default: [],
    },
    status: {
      type: Sequelize.BOOLEAN,
      default: false,
    },
  },
  {}
);

module.exports = Class;
