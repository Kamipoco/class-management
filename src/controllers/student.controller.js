import {
  db
} from "../config/config";
import Student from "../models/student.model";
import Classroom from "../models/classroom.model";
import Course from "../models/course.model";
import ClassStudent from "../models/classstudent.model";
import StudentCourse from "../models/studentcourse.model";
import bcrypt from "bcryptjs";
import {
  updateProfileSchema
} from "../validations/student";
import {
  changePasswordSchema
} from "../validations/student";
import {
  Op
} from "sequelize";
import {
  testConvertStudents
} from "../services/convertJsonStudent";
import cloudinary from "../utils/cloudinary";
import upload from "../utils/multer";
import multipleUploadService from "../services/multipleUploadService";
import {
  cloudinaryImageUploadMethod
} from "../services/cloudinaryImageUploadMethod";
import {
  uploadFile,
  getFileStream,
  getFileLink
} from "../services/uploadS3.js"
import fs from "fs"
import util from "util"

const unlinkFile = util.promisify(fs.unlink);

const getStudents = async (req, res, next) => {
  try {
    const {
      download
    } = req.query;

    const students = await Student.findAll({
      include: [{
          model: Classroom,
          as: "Classroom",
          attributes: ["class_name"],
        },
        {
          model: Course,
          as: "Course",
          attributes: ["subject_name", "title", "description"],
        },
      ],
      order: [
        ["createdAt", "DESC"]
      ],
      attributes: {
        exclude: ["password"],
      },
    });

    if (download === "true") {
      const result = await testConvertStudents(students);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "Report.xlsx"
      );

      res.send(result);
      res.end();
      return res;
    } else {
      return res.status(200).json({
        msg: "success",
        data: students,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    // const { download } = req.query;

    const student = await Student.findByPk(req.params.id, {
      include: [{
          model: Classroom,
          as: "Classroom",
          attributes: ["class_name"],
        },
        {
          model: Course,
          as: "Course",
          attributes: ["subject_name", "title", "description"],
        },
      ],
      attributes: {
        exclude: ["password"],
      },
    });

    if (!student) {
      return res.status(404).json({
        error: "Student not found",
      });
    }

    return res.status(200).json({
      msg: "success",
      data: student,
    });
  } catch (error) {
    console.log(error);
  }
};

//get url images from local or DB
const getFilesById = async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      attributes: {
        exclude: ["password", "resetToken", "expireToken"],
      },
    });

    return res.status(200).json({
      msg: "success",
      data: student.files,
    });
  } catch (error) {
    console.log(error);
  }
};

const getMyFiles = async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.user.id, {
      attributes: {
        exclude: ["password", "resetToken", "expireToken"],
      },
    });

    return res.status(200).json({
      msg: "success",
      data: student.files,
    });
  } catch (error) {
    console.log(error);
  }
};

//upload multiple files (local)
const uploadMultipleFileLocal = async (req, res, next) => {
  try {
    const urls = [];

    await multipleUploadService(req, res);

    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file or more.`);
    }

    for (let i = 0; i < req.files.length; i++) {
      urls.push(req.files[i].path);
    }

    const student = await Student.findByPk(req.user.id, {
      attributes: {
        exclude: ["password", "resetToken", "expireToken"],
      },
    });

    const result = await student.update({
      files: urls.map((value) => value),
    });

    return res.status(200).json({
      msg: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

//upload multiple files cloud (cloudinary)
const uploadMultipleFilesCloud = async (req, res, next) => {
  const urls = [];
  const files = req.files;
  for (const file of files) {
    const {
      path
    } = file;
    const newPath = await cloudinaryImageUploadMethod(path);

    urls.push(newPath);
  }

  const student = await Student.findByPk(req.user.id, {
    attributes: {
      exclude: ["password", "resetToken", "expireToken"],
    },
  });

  const result = await student.update({
    files: urls.map((value) => value.url),
  });

  return res.status(200).json({
    msg: "success",
    data: result,
  });
};

//upload multiple files cloud (S3)
const uploadMultipleFileCloudS3 = async (req, res, next) => {
  try {
    console.log("===", req.files);

    // // uploading to AWS S3
    for (let i of req.files) {
      const result = await uploadFile(i);
      console.log("S3 response", result);

      // You may apply filter, resize image before sending to client

      // Deleting from local if uploaded in S3 bucket
      await unlinkFile(i.path);
    }



    res.send({
      status: "success",
      message: "Files uploaded successfully",
      data: req.files,
    });
  } catch (error) {
    console.log(error);
  }
};

//Get file stream S3
const getFileStreamS3 = (req, res, next) => {
  const key = req.params.key;
  console.log(req.params.key);
  const readStream = getFileStream(key);
  readStream.pipe(res);
}

//Serving Files via Amazon CloudFront
const downloadFileCloudFront = async (req, res, next) => {
  let response = await getFileLink(req.query.filename);
  res.send(response);
  res.end();
}

const studentJoinClass = async (req, res, next) => {
  try {
    const result = await ClassStudent.create({
      classroom_id: req.body.classroom_id,
      student_id: req.user.id,
    });

    await result.save();

    return res.status(200).json({
      msg: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const studentJoinCourse = async (req, res, next) => {
  try {
    const result = await StudentCourse.create({
      student_id: req.user.id,
      course_id: req.body.course_id,
    });

    await result.save();

    return res.status(200).json({
      msg: " success",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProfileStudent = async (req, res, next) => {
  const {
    student_name,
    bio
  } = req.body;
  const validation = await updateProfileSchema.validateAsync(req.body);

  const student = await Student.findByPk(req.params.id, {
    // include: [
    //   {
    //     model: Classroom,
    //     as: "Classroom",
    //   },
    //   {
    //     model: Course,
    //     as: "Course",
    //   },
    // ],
    attributes: {
      exclude: ["password", "resetToken", "expireToken"],
    },
  });

  if (!student) {
    return res.status(404).json({
      error: "Student not found",
    });
  }

  const updated = await student.update({
    student_name: student_name,
    bio: bio,
  });

  return res.status(200).json({
    msg: "success",
    data: updated,
  });
};

const changePassword = async (req, res, next) => {
  const {
    currentPassword,
    newPassword
  } = req.body;

  const infoStudent = await Student.findByPk(req.params.id); //req.user.id
  const isPassword = await bcrypt.compareSync(
    currentPassword,
    infoStudent.password
  );

  if (!isPassword) {
    return res.status(401).json({
      error: "Invalid Password",
    });
  }

  infoStudent.password = await bcrypt.hash(newPassword, 12);

  await infoStudent.save();

  return res.status(200).json({
    msg: "success",
  });
};

const deleteStudent = async (req, res, next) => {
  const result = await Student.findByPk(req.params.id); //req.user.id

  if (!result) {
    return res.status(404).json({
      error: "Student not found",
    });
  }

  await result.destroy();

  return res.status(200).json({
    msg: "success",
  });
};

const listStudent = async (req, res, next) => {
  const {
    page
  } = req.query;

  const number = Number(page);
  const per_page = 4;

  try {
    let students;

    if (number === 1 || number === 0) {
      students = await Student.findAll({
        include: [{
            model: Classroom,
            as: "Classroom",
            attributes: ["class_name"],
          },
          {
            model: Course,
            as: "Course",
            attributes: ["subject_name", "title", "description"],
          },
        ],
        // order: [["createdAt", "DESC"]],
        limit: per_page,
        offset: 0,
      });
    } else {
      const skips = per_page * (number - 1);
      students = await Student.findAll({
        include: [{
            model: Classroom,
            as: "Classroom",
            attributes: ["class_name"],
          },
          {
            model: Course,
            as: "Course",
            attributes: ["subject_name", "title", "description"],
          },
        ],
        // order: [["createdAt", "DESC"]],
        offset: skips,
        limit: per_page,
      });
    }

    return res.status(200).json({
      msg: "success",
      data: students,
    });
  } catch (error) {
    console.log(error);
  }
};

const searchStudent = async (req, res, next) => {
  try {
    const fieldSearch = req.query.name;

    if (!fieldSearch || fieldSearch.length === 0) {
      return res.status(422).json({
        error: "Please fill in all fields"
      });
    }

    const student = await Student.findAndCountAll({
      where: {
        student_name: {
          [Op.iLike]: fieldSearch
        },
      },
      include: [{
          model: Classroom,
          as: "Classroom",
          attributes: ["class_name"],
        },
        {
          model: Course,
          as: "Course",
          attributes: ["subject_name", "title", "description"],
        },
      ],
      attributes: {
        exclude: ["password"],
      },
    });

    if (student.count === 0) {
      return res.status(404).json({
        status: 404,
        message: "Not Found!"
      });
    }

    return res.status(200).json({
      msg: "success",
      data: student,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getStudents,
  getStudentById,
  getFilesById,
  getMyFiles,
  uploadMultipleFileLocal,
  uploadMultipleFilesCloud,
  uploadMultipleFileCloudS3,
  studentJoinClass,
  studentJoinCourse,
  updateProfileStudent,
  changePassword,
  deleteStudent,
  listStudent,
  searchStudent,
  getFileStreamS3,
  downloadFileCloudFront
};