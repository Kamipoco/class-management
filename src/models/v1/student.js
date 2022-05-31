"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.belongsTo(models.Classroom, {
        foreignKey: "student_id",
        as: "classroom",
      });

      Student.belongsToMany(models.Course, {
        through: "StudentCourse",
        as: "course",
        foreignKey: "student_id",
      });
    }
  }
  Student.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      student_name: {
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
        type: Sequelize.STRING,
        defaultValue: "student",
      },
      resetToken: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      expireToken: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      classroom_id: {
        //luu trong mot bang noi ClassStudent
        type: DataTypes.INTEGER,
        references: {
          model: "Classroom",
          key: "id",
          as: "classroom_id",
        },
      },
    },
    {
      sequelize,
      modelName: "Student",
    }
  );
  return Student;
};
