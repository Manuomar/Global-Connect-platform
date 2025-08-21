// Name: "", Mail: "", Contact: "", type: "", ResumeLink: "", Course: "",skills:"" ,Description:""
import mongoose from "mongoose";

let applySchema = new mongoose.Schema({
Name:{
        type:String,
        required:true
    },
Mail:{
        type:String,
        required:true
    }, 
Contact:{
        type:Number,
        required:true
    },
 type:{
        type:String,
        required:true
    }, 
ResumeLink:{
        type:String,
        required:true
    },
Course:{
        type:String,
        required:true
    },
skills:{
        type:String,
        required:true
    },
Description:{
    type:String,
    required:true
},
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    jobTitle: { type: String }
},{timestamps:true})

const Apply=mongoose.model("Apply",applySchema)
export default Apply