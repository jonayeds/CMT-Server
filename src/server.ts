import app from "./app";
import dotenv from "dotenv"

dotenv.config()

let server;


async function main(){
    server = app.listen(process.env.PORT, ()=>{
        console.log(`Application is a listening on port ${process.env.PORT}`)
    })
}

main()


