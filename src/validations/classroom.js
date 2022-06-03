import Joi from "joi";

const addClassSchema = Joi.object({
  class_name: Joi.string().min(2).max(30).required(),
});

const addWithStudentSchema = Joi.object({
  class_name: Joi.string().min(2).max(30).required(),
  student_id: Joi.number().integer(),
});

module.exports = {
  addClassSchema,
  addWithStudentSchema,
};
