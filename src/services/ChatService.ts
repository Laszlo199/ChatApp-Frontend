import type { PostChatDto } from "@/dtos/chat/PostChatDto";
import { io } from "socket.io-client";

export class ChatService{
    socket = io("localhost:3001");

  constructor() {
    this.socket.connect();
    this.socket.on("connect", () => {
      console.log(this.socket.id);
    });
  }

  createChat(chat: PostChatDto) {
    //chat.roomName = "jjjjj" //TEMporary solution!!
    this.socket.emit("createChat", chat);
  }

  listenToRoom(room: string, chatListener: (chat: PostChatDto) => void) {
    this.socket.on(room, (chat: PostChatDto) => {
      chatListener(chat);
    });
  }

  disconnectFromRoom(room: string) {
    this.socket.off(room);
  }

}