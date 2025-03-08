import express, { Application,  ErrorRequestHandler,  NextFunction,  Request, Response } from "express"
import cors from "cors"
import { UserRoutes } from "./app/modules/user/user.routes"
const app:Application = express()

// persers
app.use(express.json())
app.use(cors())



// application Routes
app.use("/api/v1/user", UserRoutes)


app.get("/", (req:Request,res:Response)=>{
    res.send("Server is Running...🏃🏼‍♂️‍➡️")
})

const errorHandler: ErrorRequestHandler = (err:any, req:Request, res:Response, next:NextFunction)=>{
    let statusCode = 500
    let message = "Something went wrong"
    res.status(statusCode).json({
        success:false,
        message,
        error:err
    })
}


app.use(errorHandler)

export default app