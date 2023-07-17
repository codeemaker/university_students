import mongoose,{ Schema, model } from "mongoose";

const universitySchema = new Schema({
    name:{type:String,required:true},
    location:{type:String,required:true},
    established_year:{type:Number,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    website:{type:String,required:true},
    status:{type:Boolean,required:true},
    description:{type:String,required:true}
},{timestamps:true});

const universityTokenSchema = new Schema({
    universityId:{type:mongoose.Schema.Types.ObjectId,required:true},
    token:{type:String,required:true}
},{timestamps:true});

const UniversityModel = model("universities",universitySchema);
const UnivTokenModel = model("univTokens",universityTokenSchema);

export { UniversityModel, UnivTokenModel };