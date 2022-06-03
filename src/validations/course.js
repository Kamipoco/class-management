import Joi from "joi";

const addCourseSchema = Joi.object({
  subject_name: Joi.string().min(1).max(30).required(),
});

const updateCourseSchema = Joi.object({
  subject_name: Joi.string().min(1).max(50).required(),
  title: Joi.string().default(""),
  description: Joi.string().default(""),
});

module.exports = {
  addCourseSchema,
  updateCourseSchema,
};
