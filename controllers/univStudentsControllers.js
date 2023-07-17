import { StudentModel, StudentTokenModel } from "../models/studentModel.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import * as env from "dotenv";
import SendMail from "../functions/sendMail.js";

env.config();

const createUnivStudent=async (req,res)=>{
    try{
        const univId=req.univId;
        const { name, course, batch, universityId, email, password } = req.body;

        if(name && course && batch && universityId && email && password){
            let findName=await StudentModel.findOne({email:email,status:true});

            if(findName){
                res.status(409).json({status:false,message:"Student data already exists"});
            }
            else{
                let hashedpassword = bcrypt.hashSync(password,10);
                let updatedObj = {...req.body,password:hashedpassword,status:true,universityId:univId,profile:req.file ? req.file.path : ""};
                await StudentModel(updatedObj).save();
                SendMail(email,"User Details",`EMail: ${email} , Password : ${password}`);
                res.status(200).json({status:true,message:"Student registered successfully"});
            }
        }
        else{
            res.status(500).json({status:false,message:"All fields are required"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:false,message:"Something went wrong"});
    }
}


const getAllUnivStudents = async(req,res)=>{
    try{
        const univId = req.univId;
        console.log(univId);
        let univData = await StudentModel.find({status:true,universityId:univId},{password:0});

        if(univData.length > 0){
            res.status(200).json({status:true,data:univData});
        }
        else{
            res.status(204).json({status:false,message:"No data available"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:false,message:"Something went wrong"});
    }
}

const updateUnivStudents = async(req,res)=>{
    try{
        const { id } = req.params;
        const { password } = req.body;
        const univId = req.univId;
        let hashedpassword = bcrypt.hashSync(password,10);
        let updatedObj = {...req.body,password:hashedpassword,profile:req.file ? req.file.path : ""};
        await StudentModel.updateOne({_id:id,universityId:univId},updatedObj);
        res.status(200).json({status:true,message:"Updated successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:false,message:"Something went wrong"});
    }
}

const deleteUnivStudents = async (req, res) => {
    try {
        const { id } = req.params;
        const univId = req.univId;
        // Insteadof deleting data, changing status to false
        const result = await StudentModel.updateOne({ _id: id, universityId:univId },{ status:false });
        if (result.modifiedCount > 0) {
            res.status(200).json({ status: true, message: "Deleted successfully" });
        } else {
            res.status(404).json({ status: false, message: "Data not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: "Something went wrong" });
    }
};

export { createUnivStudent, getAllUnivStudents, updateUnivStudents, deleteUnivStudents };