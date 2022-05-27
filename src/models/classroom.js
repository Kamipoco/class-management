"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Classroom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Classroom.hasMany(models.Student, {
        foreignKey: "classroom_id",
        as: "student",
        sourceKey: "id",
      });
    }
  }
  Classroom.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      class_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      //#region
      //thuoc tinh StudentArray thi dung relationship de lay ra so luong thanh vien chu khong khoi tao thuoc tinh
    },
    {
      sequelize,
      modelName: "Classroom",
    }
  );
  return Classroom;
};
