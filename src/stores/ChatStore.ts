import { defineStore } from "pinia";

import { ChatService } from "@/services/ChatService";
import type { PostChatDto } from "@/dtos/chat/PostChatDto";


const chatService = new ChatService();

export const ChatStore = defineStore({
  id: "ChatStore",
  state: () => ({
    chats: [] as PostChatDto[],
    roomName: "",
    typingArray: [] as string[]
  }),
  actions: {
    createChat(chat: PostChatDto) {
      chatService.createChat(chat)
    },
    startTyping(username: string) {
      chatService.setTyping({roomName: this.roomName, username: username, isTyping: true});
    },
    stopTyping(username: string) {
      chatService.setTyping({roomName: this.roomName, username: username, isTyping: false});
    },
    setRoom(roomName: string) {
      console.log("room name: "+ roomName)
      if (this.roomName) chatService.disconnectFromRoom(this.roomName);
      this.roomName = roomName;
      this.chats = [];
      this.typingArray = [];
      chatService.listenToRoom(roomName, (chat) => {
        this.chats.push(chat);
      });
      chatService.listenForTyping(roomName, (typingEvent) => {
        //when isTyping is true it means that person started typing so we add them to an array of people typing,
        //when isTyping is false it means that the person stopped typing so we can delete them from the array
        if(typingEvent.isTyping && !this.typingArray.find((user) => user==typingEvent.username)) {
          this.typingArray.push(typingEvent.username);
        }
        else if(!typingEvent.isTyping) {
          this.typingArray.forEach((element,index)=>{
            if(element==typingEvent.username) this.typingArray.splice(index,1);
          });
        }
      })
    },
  },
});