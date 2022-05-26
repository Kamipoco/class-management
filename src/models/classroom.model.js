import Sequelize from "sequelize";
import { db } from "../configs/database";

export default (sequelize, DataTypes) => {
  const Classroom = db.define("Classroom", {
    id: {
      type: DataTypes.INTEGER,
      autoIncement: true,
      allowNull: false,
      primaryKey: true,
    },
    class_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      default: "",
    },
    status: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
  });
};
