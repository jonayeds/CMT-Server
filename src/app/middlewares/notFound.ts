import { ErrorRequestHandler, NextFunction, Request, Response } from "express"

export const notFound = ( req:Request, res:Response, next:NextFunction)=>{
    let statusCode = 404
    
    res.status(statusCode).json({
        success:false,
        message: "Route not found",
    })
}