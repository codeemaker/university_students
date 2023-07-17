import mongoose,{ Schema, model } from "mongoose";

const studentSchema = new Schema({
    name:{type:String,required:true},
    course:{type:String,required:true},
    batch:{type:String,required:true},
    universityId:{type:mongoose.Schema.Types.ObjectId,required:true},
    email:{type:String,required:true},
    profile:{type:String},
    password:{type:String,required:true},
    status:{type:Boolean,required:true},
},{timestamps:true});

const studentTokenSchema = new Schema({
    studentId:{type:mongoose.Schema.Types.ObjectId,required:true},
    token:{type:String,required:true}
},{timestamps:true});

const StudentModel = model("students",studentSchema);
const StudentTokenModel = model("studentTokens",studentTokenSchema);

export { StudentModel, StudentTokenModel };