import express, { Application, Request, Response } from "express"
import cors from "cors"
const app:Application = express()

// persers
app.use(express.json())
app.use(cors())






app.get("/", (req:Request,res:Response)=>{
    res.send("Server is Running...🏃🏼‍♂️‍➡️")
})

export default app