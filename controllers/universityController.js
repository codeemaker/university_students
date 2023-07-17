import { UniversityModel, UnivTokenModel } from "../models/universityModel.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import * as env from "dotenv";

env.config();

const signup=async (req,res)=>{
    try{
        const { name, location, established_year, email, password, website, description } = req.body;

        if(name && location && established_year && email && password && website && description){
            let findName=await UniversityModel.findOne({$or:[
                {name:name},
                {email:email}
            ],status:true});

            if(findName){
                res.status(409).json({status:false,message:"University data already exists"});
            }
            else{
                let hashedpassword = bcrypt.hashSync(password,10);
                let updatedObj = {...req.body,password:hashedpassword,status:true};
                await UniversityModel(updatedObj).save();
                res.status(200).json({status:true,message:"University registered successfully"});
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

const login = async (req,res)=>{
    try{
        const { email, password } = req.body;
        let secretKey = process.env.SECRET_KEY
        let findUniversity = await UniversityModel.findOne({email:email,status:true});
        if(findUniversity){
            let verifyPassword = bcrypt.compareSync(password,findUniversity.password);
            if(verifyPassword){
                let token=Jwt.sign({id:findUniversity._id,email:findUniversity.email},secretKey,{expiresIn:"1h"});
                await UnivTokenModel({
                    universityId:findUniversity._id,
                    token
                }).save();
                res.status(200).json({status:true,token,message:"Login successfully"});
            }
            else{
                res.status(401).json({status:false,message:"Incorrect password"});
            }
        }
        else{
            res.status(401).json({status:false,message:"Invalid user"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:false,message:"Something went wrong"});
    }
}

const getAllUniv = async(req,res)=>{
    try{
        let univData = await UniversityModel.find({status:true},{password:0});

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

const updateUniv = async(req,res)=>{
    try{
        const { id } = req.params;
        const { password } = req.body;
        if(password){
            let hashedpassword = bcrypt.hashSync(password,10);
            let updatedObj = {...req.body,password:hashedpassword};
            await UniversityModel.updateOne({_id:id},updatedObj);       
        }
        else{
            await UniversityModel.updateOne({_id:id},req.body);
        }
        res.status(200).json({status:true,message:"Updated successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:false,message:"Something went wrong"});
    }
}

const deleteUniv = async (req, res) => {
    try {
        const { id } = req.params;
        // Insteadof deleting data, changing status to false
        const result = await UniversityModel.updateOne({ _id: id },{ status:false });
        if (result.modifiedCount > 0) {
            res.status(200).json({ status: true, message: "Deleted successfully" });
        } else {
            res.status(404).json({ status: false, message: "University not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: "Something went wrong" });
    }
};

export { signup, login, getAllUniv, updateUniv, deleteUniv };