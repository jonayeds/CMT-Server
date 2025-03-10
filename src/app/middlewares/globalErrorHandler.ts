import { ErrorRequestHandler, NextFunction, Request, Response } from "express"

export const errorHandler: ErrorRequestHandler = (err:any, req:Request, res:Response, next:NextFunction)=>{
    let statusCode = 500
    let message =err?.message || "Something went wrong"
    res.status(statusCode).json({
        success:false,
        message,
        error:err
    })
}