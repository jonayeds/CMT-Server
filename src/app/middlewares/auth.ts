import { Request } from "express"
import config from "../config"
import { catchAsync } from "../utils/catchAsync"
import jwt, { JwtPayload } from "jsonwebtoken"

export interface CustomRequest extends Request{
    user?:JwtPayload
}

export const auth = () =>{
    return catchAsync(async (req:CustomRequest,res,next)=>{
        const token = req.headers.authorization
        if(!token){
            throw new Error("You are not Authorize")
        }   
        jwt.verify(token, config.jwt_access_secret as string, function (err, deccoded){
            if(err){
                throw new Error("You are not Authorize")
            }
            req.user = deccoded as JwtPayload
        })

        next()
    })
}