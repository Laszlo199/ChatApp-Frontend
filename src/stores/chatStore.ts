import { defineStore } from "pinia";

import { ChatService } from "@/services/ChatService";
import type { GetChatDto } from "@/dtos/chat/GetChatDto";
import type { PostChatDto } from "@/dtos/chat/PostChatDto";
import type { GetRoomsDto } from "@/dtos/GetRoomsDto";

const chatService = new ChatService();

export const ChatStore = defineStore({
  id: "ChatStore",
  state: () => ({
    chats: [{ text: "First chat" }, { text: "Second chat" }] as PostChatDto[], // we don't need id's maybe we should store is as a model
    room: [] as GetRoomsDto[],
  }),
  getters: {
    chats: (state) => { return state.chats;
    },
  },
  actions: {
    createChat(chat: PostChatDto) {
      chatService.createChat(chat);
      this.chats.push(chat);
    },
    receiveChat(chat: PostChatDto) {
      this.chats.push(chat);
    },
    setRoom(room: GetRoomsDto) {
      if (this.room.length ==1){
         chatService.disconnectFromRoom(this.room[0].id.toString());
         console.log("we shouldnt get there")
      }
      if(this.room.length==0)
            this.room.push(room);
      else{
          this.room.pop();
          this.room.push();
      }
      console.log("set room in store: "+ room.name)
      chatService.listenToRoom(room.id.toString(), (chat)=> {
        this.chats.push(chat);
      });
    },
  },
});