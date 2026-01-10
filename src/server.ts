import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import http from "http";
import { Server } from "socket.io";
import { MessageServices } from "./app/modules/message/message.service";
import { setupSocket } from "./socket/socket";

async function main() {
  try {
    await mongoose.connect(config.database_uri as string);
    const server = http.createServer(app);
    const io = new Server(server, {
      cors: {
        origin: ["https://cmt-client.vercel.app", "http://localhost:3000"],
        credentials: true,
      },
    });

    setupSocket(io);

    server.listen(config.port, () => {
      console.log(`Application is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
