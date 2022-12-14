import Joi from "joi";

const addLecturerSchema = Joi.object({
  lecturer_name: Joi.string().min(1).max(30).required(),
});

const addWithCourseSchema = Joi.object({
  lecturer_name: Joi.string().min(1).max(30).required(),
  subject_name: Joi.string().min(1).max(50).required(),
});

const updateLecturerSchema = Joi.object({
  lecturer_name: Joi.string().min(1).max(30).required(),
  bio: Joi.string().default(""),
});

module.exports = {
  addLecturerSchema,
  addWithCourseSchema,
  updateLecturerSchema,
};
