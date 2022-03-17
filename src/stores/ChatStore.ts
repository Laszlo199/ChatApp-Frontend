import { defineStore } from "pinia";

import { ChatService } from "@/services/ChatService";
import type { PostChatDto } from "@/dtos/chat/PostChatDto";


const chatService = new ChatService();

export const ChatStore = defineStore({
  id: "ChatStore",
  state: () => ({
    chats: [] as PostChatDto[],
     roomName: ""
  }),
  actions: {
    createChat(chat: PostChatDto) {
      chatService.createChat(chat)
    },
    setRoom(roomName: string) {
      console.log("room name: "+ roomName)
      if (this.roomName) chatService.disconnectFromRoom(this.roomName);
      this.roomName = roomName;
      this.chats = []
      chatService.listenToRoom(roomName, (chat) => {
        this.chats.push(chat);
      });
    },
  },
});