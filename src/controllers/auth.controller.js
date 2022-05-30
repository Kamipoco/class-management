import bcrypt from "bcryptjs";
import { signJWT } from "../services/signJWT";
import Student from "../models/student.model";

const signUp = async (req, res, next) => {
  try {
    const { student_name, email, password } = req.body;

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

    const check = await Student.findOne({
      where: {
        email: email.toLowerCase().toString(),
      },
    });

    if (!check) {
      return res.status(422).json({
        message: "Invalid Email or Password",
      });
    }

    const comparePassword = bcrypt.compare(password, check.password);

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

module.exports = {
  signUp,
  signIn,
};
