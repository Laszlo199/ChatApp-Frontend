import type { PostChatDto } from "@/dtos/chat/PostChatDto";
import { io } from "socket.io-client";
import type {TypingDto} from "@/dtos/TypingDto";

export class ChatService{
    socket = io("localhost:3001");

  constructor() {
    this.socket.connect();
    this.socket.on("connect", () => {
      console.log(this.socket.id);
    });
  }

  createChat(chat: PostChatDto) {
    this.socket.emit("createChat", chat);
  }

  listenToRoom(room: string, chatListener: (chat: PostChatDto) => void) {
    this.socket.on(room, (chat: PostChatDto) => {
      chatListener(chat);
    });
  }

  listenForTyping(room: string, typingListener: (typingEvent: TypingDto) => void) {
    this.socket.on(room+'-typing', (typingEvent: TypingDto) => {
      typingListener(typingEvent);
    });
  }

  setTyping(typing: TypingDto) {
    this.socket.emit('typing', typing);
  }

  disconnectFromRoom(room: string) {
    this.socket.off(room);
  }

}