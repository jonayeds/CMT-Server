import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import http from "http"
import {Server} from 'socket.io'





async function main(){
    try {
        await mongoose.connect(config.database_uri as string)        
        const server = http.createServer(app)
        const io = new Server(server, {
            cors:{
                origin:"http://localhost:3000",
                credentials:true
            }
        }) 

        io.on("connection", (socket)=>{
            console.log("user connected")
            socket.on('newMessage', (message)=>{
                console.log("Emiting message from other user to :" ,message?.chat)

                io.emit('receiveMessage', message)
            })
            
            socket.on('disconnect', ()=>{
                console.log("user is disconected")
            })
        }) 


        server.listen(config.port, ()=>{
            console.log(`Application is a listening on port ${config.port}`)
        })

        
    } catch (error) {
        console.log(error)
    }
}

main()


