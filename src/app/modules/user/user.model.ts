import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";


const userSchema = new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    id:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    profileImage:{
        type:String,
    },
    role:{
        type:String,
        enum:["faculty", "student"]
    }
},{
    timestamps:true
})

const User = model<IUser>("User", userSchema)