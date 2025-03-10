import express, { Application, Request, Response } from "express"
import cors from "cors"
import { UserRoutes } from "./app/modules/user/user.routes"
import { errorHandler } from "./app/middlewares/globalErrorHandler"
import { notFound } from "./app/middlewares/notFound"
const app:Application = express()

// persers
app.use(express.json())
app.use(cors())



// application Routes
app.use("/api/v1/user", UserRoutes)


app.get("/", (req:Request,res:Response)=>{
    res.send("Server is Running...🏃🏼‍♂️‍➡️")
})




app.use(errorHandler)

app.use(notFound)

export default app