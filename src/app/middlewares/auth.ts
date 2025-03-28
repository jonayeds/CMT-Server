import { Request } from "express"
import config from "../config"
import { catchAsync } from "../utils/catchAsync"
import jwt, { JwtPayload } from "jsonwebtoken"
import { TUserRole } from "../modules/user/user.constant"

export interface CustomRequest extends Request{
    user?:JwtPayload
}

export const auth = (...requiredRoles:TUserRole[]) =>{
    return catchAsync(async (req:CustomRequest,res,next)=>{
        const token = req.headers.authorization
        
        if(!token){
            throw new Error("You are not Authorize")
        }   
        jwt.verify(token, config.jwt_access_secret as string, function (err, deccoded){
            if(err){
                throw new Error("You are not Authorize")
            }
            const {role} = deccoded as JwtPayload
            if(requiredRoles && !requiredRoles.includes(role)){
                throw new Error("You are not Authorized")
            }
            req.user = deccoded as JwtPayload
        })
        next()
    })
}