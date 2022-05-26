import Sequelize from "sequelize";
import { db } from "../configs/database";

const User = db.define(
  "User",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: "Please enter your name",
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: "Please enter your email address",
      },
      unique: {
        args: true,
        msg: "Email already exists",
      },
      validate: {
        isEmail: {
          args: true,
          msg: "Please enter a valid email address",
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: "Please enter a password",
      },
    },
    resetToken: {
      type: Sequelize.STRING,
    },
    exprireToken: {
      type: Sequelize.DATE,
    },
    bio: {
      type: Sequelize.STRING,
      default: "",
    },
    role: {
      type: Sequelize.STRING,
      default: "Teacher",
    },
    classId: {
      type: Sequelize.STRING,
      references: {
        model: "Class",
        key: "id",
        as: "classId",
      },
    },
  },
  {}
);

module.exports = User;
