import { defineStore } from "pinia";

import { ChatService } from "@/services/ChatService";
import type { GetChatDto } from "@/dtos/chat/GetChatDto";
import type { PostChatDto } from "@/dtos/chat/PostChatDto";
import type { GetRoomsDto } from "@/dtos/GetRoomsDto";

const chatService = new ChatService();

export const ChatStore = defineStore({
  id: "ChatStore",
  state: () => ({
    chats: [
      { text: "First chat", userId:1 },
     { text: "Second chat", userId:2 } ] as PostChatDto[], // we don't need id's maybe we should store is as a model
     roomName: ""
  }),
  // getters: {
  //   chats: (state) => { 
  //     return state.chats;
  //   },
  // },
  actions: {
    createChat(chat: PostChatDto) {
        //here we can add an id ..
      chatService.createChat(chat)
      this.chats.push(chat);
    },
    receiveChat(chat: PostChatDto) {
      this.chats.push(chat);
    },
    setRoom(roomName: string) {
      console.log("room name: "+ roomName)
      if (this.roomName) chatService.disconnectFromRoom(this.roomName);
      this.roomName = roomName;
      chatService.listenToRoom(roomName, (chat) => {
        this.chats.push(chat);
      });
    },
  },
});