"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsToMany(models.Student, {
        through: "StudentCourse",
        as: "student",
        foreignKey: "course_id",
      });

      Course.belongsTo(models.Lecturer, {
        foreignKey: "lecturer_id",
        as: "lecturer",
      });
    }
  }
  Course.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      subject_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      description: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      lecturer_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Lecturer",
          key: "id",
          as: "lecturer_id",
        },
      },
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
