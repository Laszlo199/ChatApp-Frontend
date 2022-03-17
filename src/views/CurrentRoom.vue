<template>

  <div class="flex justify-center h-screen w-screen">
    <div class="container drop-shadow-md p-5 flex-col bg-slate-100 rounded-xl w-2/5 h-2/3">

      <!--HEADER-->
      <div class="mb-5">
        <h2 class="text-xl font-bold text-slate-900 text-center">Room: {{chatStore.roomName}} </h2>
      </div>

    <!--SEARCH FIELD-->
      
        <form @submit.prevent="sendChat" class="group relative mb-5 flex flex-row w-full h-16 p-2 space-x-2.5">

              <input class=" basis-4/5 focus:ring-2 focus:ring-slate-400 focus:outline-none appearance-none w-2/3 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter projects"
                placeholder="Message..." v-model="txtChatInput">
              <button class=" basis-1/5 text-black  rounded bg-slate-500">Send</button>  
        
        </form>
      


      <!--Messages LIST-->
      <div class="w-full overflow-y-scroll h-2/3 text-blue-700">
        <table class="table-auto w-full">
               <tbody>
          <tr v-for="chat in chatStore.chats" v-bind:key="chat.text" class="hover:bg-slate-200">
            <!--user that wrote that chat-->
            <td class="basis 1/4">
              <div class="font-semibold">{{ chat.userN }}</div>
            </td>
            <!--AUTHOR-->
            <td class="basis 1/2" >{{chat.text}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GetChatDto } from "@/dtos/chat/GetChatDto";
import type { GetRoomsDto } from "@/dtos/GetRoomsDto";
import { ChatStore } from "@/stores/chatStore";
import { computed, ref } from "vue";
import { UserStore } from "@/stores/UserStore";
const chatStore = ChatStore();
const userStore = UserStore()
const txtChatInput = ref("");
const txtRoomListener = ref("");


function sendChat() {
    //TODO  show a real name 
    let chatToSend = { text: txtChatInput.value, roomName: chatStore.roomName,
     userN:  userStore.userName}; // we need a user id from userStore (not merged yet with main branch)
    console.log("text:: "+ chatToSend.text + "creator: "+ userStore.userName)
    chatStore.createChat(chatToSend);
}
</script>

<style scoped>

</style>