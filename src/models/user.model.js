import Sequelize from "sequelize";
import { db } from "../configs/database";

export default (sequelize, DataTypes) => {
  const User = db.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Please enter your name",
      },
    },
    email: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Please enter a password",
      },
    },
    bio: {
      type: DataTypes.STRING,
      default: "",
    },
    role: {
      type: DataTypes.STRING,
      default: "Lecturer",
    },
    classId: {
      type: Sequelize.STRING,
      references: {
        model: "Classroom",
        key: "id",
        as: "classId",
      },
    },
    // resetToken: {
    //   type: Sequelize.STRING,
    // },
    // exprireToken: {
    //   type: Sequelize.DATE,
    // },
  });
  User.associate = (models) => {
    //1 - 1
    // associations can be defined here
    User.hasMany(models.User, {
      foreignKey: "classId",
    });
  };
  return Classroom;
};
