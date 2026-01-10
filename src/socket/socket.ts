import { Server } from "socket.io";
import { MessageServices } from "../app/modules/message/message.service";
import { socketAuth } from "./middlewares/authMiddleware";

export const setupSocket = (io: Server) => {
  const chatNamespace = io.of("/chat").use(socketAuth);
  chatNamespace.on("connection", (socket) => {
    console.log("user connected");
    socket.on("join-chat", (chatId: string) => {
      socket.join(chatId);
      console.log(`User ${socket.id} joined chat room ${chatId}`);
    });

    socket.on("newMessage", async (message) => {
      console.log("Emitting message from other user to :", message?.chat);
      const result = await MessageServices.sendMessage(message);
      if (result) {
        socket.to(message.chat).emit("receiveMessage", {
          message: result.message,
          from: result.from,
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("user is disconnected");
    });
  });
};
