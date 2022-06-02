import Joi from "joi";

const SignUpSchema = Joi.object({
  student_name: Joi.string().min(5).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .min(5)
    .max(50)
    .required(),
  password: Joi.string().min(5).max(50).required(),
  bio: Joi.string().default(""),
});

const SignInSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .min(5)
    .max(50)
    .required(),
  password: Joi.string().min(5).max(50).required(),
});

const forgotSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .min(5)
    .max(50)
    .required(),
});

const newPasswordSchema = Joi.object({
  token: Joi.string().min(5).max(50).required(),
  password: Joi.string().min(5).max(50).required(),
});

module.exports = {
  SignUpSchema,
  SignInSchema,
  forgotSchema,
  newPasswordSchema,
};
