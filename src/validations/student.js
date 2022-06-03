import Joi from "joi";

const updateProfileSchema = Joi.object({
  student_name: Joi.string().min(5).max(30).required(),
  bio: Joi.string().default(""),
});

const changePasswordSchema = Joi.object({
  password: Joi.string().min(5).max(50).required(),
});

module.exports = {
  updateProfileSchema,
  changePasswordSchema,
};
