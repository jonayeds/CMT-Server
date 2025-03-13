import { NextFunction,  RequestHandler, Response } from "express";
import { CustomRequest } from "../middlewares/auth";

export const catchAsync  = (fn:RequestHandler)=>{
    return (req:CustomRequest,res:Response, next:NextFunction)=>{
        Promise.resolve(fn(req, res, next)).catch(err => next(err))
    }
}