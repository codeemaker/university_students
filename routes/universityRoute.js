import { Router } from "express";
import { signup, login, getAllUniv, updateUniv, deleteUniv } from "../controllers/universityController.js";
import { createUnivStudent, getAllUnivStudents, updateUnivStudents, deleteUnivStudents } from "../controllers/univStudentsControllers.js"
import auth from "../middlewares/auth.js";
import upload from "../functions/UploadFiles.js";

const universityRoutes = Router();

universityRoutes.post("/signup",signup);
universityRoutes.post("/login",login);
universityRoutes.get("/getUniversities",getAllUniv);
universityRoutes.put("/updateUniv/:id",updateUniv)
universityRoutes.delete("/deleteUniv/:id",deleteUniv);
universityRoutes.post("/createstudent",auth,upload.single("profile"),createUnivStudent);
universityRoutes.get("/getAllUnivStudents",auth,getAllUnivStudents);
universityRoutes.put("/updateUnivStudents/:id",auth,upload.single("profile"),updateUnivStudents)
universityRoutes.delete("/deleteUnivStudents/:id",auth,deleteUnivStudents);

export default universityRoutes;