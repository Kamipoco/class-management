"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudentCourse.init(
    {
      student_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "student",
          key: "id",
          as: "student_id",
        },
      },
      course_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "course",
          key: "id",
          as: "course_id",
        },
      },
    },
    {
      sequelize,
      modelName: "StudentCourse",
    }
  );
  return StudentCourse;
};

export default StudentCourse;
