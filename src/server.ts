import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import http from "http"
import {Server} from 'socket.io'
import { MessageServices } from "./app/modules/message/message.service";




async function main(){
    try {
        await mongoose.connect(config.database_uri as string)        
        const server = http.createServer(app)
        const io = new Server(server, {
            cors:{
                origin:"https://cmt-client.vercel.app",
                credentials:true
            }
        }) 

        io.on("connection", (socket)=>{
            console.log("user connected")
            socket.on("join-chat", (chatId)=>{
                socket.join(chatId)
                console.log(`User ${socket.id} joined chat room ${chatId}`);
              })

            socket.on('newMessage', async(message)=>{
                console.log("Emiting message from other user to :" ,message?.chat)
                const result = await MessageServices.sendMessage( message)
                console.log(result)
                if(result){
                    io.to(message.chat).emit('receiveMessage', {message:result.message, from:result.from})
                }
            })
            
            socket.on('disconnect', ()=>{
                console.log("user is disconected")
            })
        }) 


        server.listen(config.port, ()=>{
            console.log(`Application is a listening on port ${config.port}`)
            setInterval(() => {
                fetch(`https://your-railway-app.up.railway.app/api/v1`)
                  .then(res => {
                    const data = res.json()
                    console.log(data)
                })
                  .catch(err => console.error('Self-ping error:', err));
              }, 15 * 60 * 1000); 
        })
    } catch (error) {
        console.log(error)
    }
}

main()


