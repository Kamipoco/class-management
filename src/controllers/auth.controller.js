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

//reset password
// const forgotPassword = async (req, res, next) => {
//   const buffer = crypto.randomBytes(32);
//   const token = buffer.toString("hex");

//   const student = await Student.findOne({
//     where: { email: req.body.email },
//   });

//   if (!student) {
//     return res.status(422).json({
//       error: "User dont exists with that email",
//     });
//   }

//   student.resetToken = token;
//   student.expireToken = Date.now() + 3600000;

//   await student.save();

//send mail

// crypto.randomBytes(32, (err, buffer) => {
//   if (err) {
//     console.log(err);
//   }
// });
// Student.findOne({ where: { email: req.body.email } }).then((user) => {
//   if (!user) {
//     return res
//       .status(422)
//       .json({ error: "User dont exists with that email" });
//   }
//   user.resetToken = token;
//   user.expireToken = Date.now() + 3600000;
//   user.save().then((result) => {
//     sgMail.send({
//       to: result.email,
//       from: {
//         name: "no-reply@insta.com",
//         email: "1751120025@sv.ut.edu.vn",
//       },
//       subject: "Reset password",
//       text: "From sendgrid",
//       html: `
//                     <h3>You requested for password reset</h3>
//                     <h3>Click in this <a href="http://localhost:4200/auth/new-password/${token}">Link</a>to reset password</h3>
//                     `,
//     });

//     return res.json({ status: 200, message: "Check your email" });
//   });
// });
// };

//create new password
// const newPassword = async (req, res, next) => {};

module.exports = {
  signUp,
  signIn,
  // forgotPassword,
  // newPassword,
};
