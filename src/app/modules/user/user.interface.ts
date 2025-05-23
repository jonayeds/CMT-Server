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
    isUserExist({email, id, identification}: {email?:string, id?:string, identification?:string}): Promise<IUser & {_id:string}| null>
    isPasswordCorrect(plainTextPassword:string, hashedPassword:string):Promise<boolean>
}

export interface IAuth{
    identification:string;
    password:string;
}



