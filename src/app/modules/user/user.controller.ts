import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";

const registerUser = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const user = req.body
    const result  = await UserServices.registerUserIntoDB(user)
    sendResponse(res, {
        statusCode:200,
        message:"Registered Successfully",
        success:true,
        data:result
    })
    } catch (error) {
        next(error)
    }
}

export const UserControllers = {
    registerUser
}