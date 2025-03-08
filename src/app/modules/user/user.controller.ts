import { Request, Response } from "express";
import { UserServices } from "./user.service";

const registerUser = async(req:Request, res:Response)=>{
    try {
        const user = req.body
    const result  = await UserServices.registerUserIntoDB(user)
    res
    .status(200)
    .json({
        success:true,
        message:"Registration Succesfull",
        data:result
    })
    } catch (error) {
        console.log(error)
    }
}

export const UserControllers = {
    registerUser
}