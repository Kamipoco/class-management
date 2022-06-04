import bcrypt from "bcryptjs";
import { signJWT } from "../services/signJWT";
import Student from "../models/student.model";
import nodemailer from "nodemailer";
import { sendMail } from "../services/sendmail";
import crypto from "crypto";
import { Op } from "sequelize";
import {
  SignUpSchema,
  SignInSchema,
  forgotSchema,
  newPasswordSchema,
} from "../validations/auth";

const signUp = async (req, res, next) => {
  try {
    const { student_name, email, password } = req.body;

    const validation = await SignUpSchema.validateAsync(req.body);

    const check = await Student.findOne({
      where: {
        email: email,
      },
    });

    if (check) {
      return res.status(422).json({
        status: false,
        errors: "User already exists with that email or username!",
      });
    }

    bcrypt.hash(password, 12, async (error, passwordhashed) => {
      if (error) {
        console.log(error);
      }

      const student = await Student.create({
        student_name,
        email,
        password: passwordhashed,
      });

      await student.save();

      return res.status(200).json({ msg: "Success", data: { student } });
    });
  } catch (error) {
    console.log(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validation = await SignInSchema.validateAsync(req.body);

    const check = await Student.findOne({
      where: {
        email: email.toLowerCase().toString(),
      },
    });

    if (!check) {
      return res.status(422).json({
        errors: "Invalid Email or Password",
      });
    }

    const comparePassword = await bcrypt.compare(password, check.password);

    if (!comparePassword) {
      return res.status(400).json({ message: "Invalid Pw" });
    }

    const token = signJWT(check);

    return res.status(200).json({
      message: "Login Success",
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const buffer = crypto.randomBytes(32);
    const token = buffer.toString("hex");
    const { email } = req.body;
    const validation = await forgotSchema.validateAsync(req.body);

    const student = await Student.findOne({
      where: { email: email },
    });

    if (!student) {
      return res.status(422).json({
        errors: "User dont exists with that email",
      });
    }

    student.resetToken = token;
    student.expireToken = Date.now() + 3600000;

    const result = await student.save();

    //send mail
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: result.email,
      subject: "Reset Password",
      html: `
        <h3>You requested for password reset</h3>
        <h3>Click in this <a href="http://localhost:5000/new-password/${token}">Link</a>to reset password</h3>
       `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.status(200).json({
          msg: "Check your email",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const newPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const validation = await newPasswordSchema.validateAsync(req.body);

    if (!token) {
      return res.status(401).json({
        errors: "Unauthorized",
      });
    }

    const check = await Student.findOne({
      where: {
        resetToken: token,
        expireToken: {
          [Op.gt]: Date.now(),
        },
      },
    });

    if (!check) {
      return res.status(422).json({
        errors: "Try again session expired",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 12);
    check.password = hashedpassword;
    check.resetToken = null;
    check.expireToken = null;

    await check.save();

    return res.status(200).json({
      msg: "Password updated success ok",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signUp,
  signIn,
  forgotPassword,
  newPassword,
};
