import { Model } from "mongoose";

export interface IUser {
    name:string;
    id:string;
    password:string;
    email:string;
    profileImage:string;
    role:"faculty" | "student";
}

export interface IUserModel extends Model<IUser>{
    isUserExist({email, id}: {email?:string, id?:string}): Promise<IUser| null>
    isPasswordCorrect(plainTextPassword:string, hashedPassword:string):Promise<boolean>
}

export interface IAuth{
    id:string;
    password:string;
}

