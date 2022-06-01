"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ClasssStudent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ClasssStudent.init(
    {
      classroom_id: DataTypes.INTEGER,
      student_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ClasssStudent",
    }
  );
  return ClasssStudent;
};
