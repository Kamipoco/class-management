"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lecturer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lecturer.hasOne(models.Course, {
        foreignKey: "lecturer_id",
        as: "course",
      });
    }
  }
  Lecturer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      lecturer_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "lecturer",
      },
    },
    {
      sequelize,
      modelName: "Lecturer",
    }
  );
  return Lecturer;
};
