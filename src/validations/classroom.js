import Joi from "joi";

const addClassSchema = Joi.object({
  class_name: Joi.string().min(2).max(30).required(),
});

const addWithStudentSchema = Joi.object({
  classroom_id: Joi.number().integer().required(),
  student_id: Joi.number().integer().required(),
});

module.exports = {
  addClassSchema,
  addWithStudentSchema,
};
