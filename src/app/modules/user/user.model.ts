import { model, Schema } from "mongoose";
import { IUser, IUserModel } from "./user.interface";
import bcrypt from "bcrypt"
import config from "../../config";

const userSchema = new Schema<IUser, IUserModel>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
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


// Statics
userSchema.static("isUserExist", async function(email:string){
    const user = await User.findOne({email})
    if(user){
        return user
    }else{
        return null
    }
})





// pre save middleware
userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, Number(config.salt_rounds))
    next()
})

// post save middleware
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });

export const User = model<IUser, IUserModel>("User", userSchema)