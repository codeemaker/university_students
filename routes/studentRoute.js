import { Router } from "express";
import { createStudent, getAllStudents, updateStudents, deleteStudents } from "../controllers/studentController.js";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import { extname } from "path";
import upload from "../functions/UploadFiles.js";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = uuidv4();
//     const extension = extname(file.originalname);
//     cb(null, uniqueSuffix + extension);
//   }
// });

// const upload = multer({ storage: storage });

const studentRoutes = Router();

studentRoutes.post("/createStudent", upload.single("profile"), createStudent);
studentRoutes.get("/getAllStudents", getAllStudents);
studentRoutes.put("/updateStudents/:id", upload.single("profile"), updateStudents);
studentRoutes.delete("/deleteStudents/:id", deleteStudents);

export default studentRoutes;
