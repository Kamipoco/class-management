import { db } from "../configs/database";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { signJWT } from "../services/signJWT";

const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //check mail
    const check = await User.findOne({
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

      const user = await User.create({
        name,
        email,
        password: passwordhashed,
      });

      await user.save();

      return res.status(200).json({ msg: "Success", data: { user } });
    });
  } catch (error) {
    console.log(error);
  }
};

// const SignIn = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const check = await User.findOne({
//       where: {
//         email: email.toLowerCase().toString(),
//       },
//     });

//     if (!check) {
//       return res.status(422).json({
//         message: "Invalid Email or Password",
//       });
//     }

//     const comparePassword = bcrypt.compare(password, check.password);

//     if (!comparePassword) {
//       return res.status(400).json({ message: "Invalid Pw" });
//     }

//     const token = signJWT(check);

//     return res.status(200).json({
//       message: "Login Success",
//       token,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const logOut = async (req, res) => {
//   try {
//     //code
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = {
  signUp,
  //   SignIn,
  //   logOut,
};
