import { catchAsync } from "../utils/catchAsync"

export const auth = () =>{
    return catchAsync(async (req,res,next)=>{
        const token = req.headers.authorization
        console.log(token)
    })
}