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
              <div class="font-semibold">{{ chat.userId }}</div>
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
//TODO remember to allign button and input in one line

//we need to pass a user for sure --> we dont cause we store them in userStore
//we need to pass 
//- actually we don't need to pass props cause we can set room to listen in our store. 
// but we need to get it then from the store after we get to this class


import type { GetChatDto } from "@/dtos/chat/GetChatDto";
import type { GetRoomsDto } from "@/dtos/GetRoomsDto";
import { ChatStore } from "@/stores/chatStore";
import { computed, ref } from "vue";
const chatStore = ChatStore();
const txtChatInput = ref("");
//const txtRoomInput = ref("");
const txtRoomListener = ref("");


//idk why the list isn't shown

//we need to merge with origin
//const currentUser = userStore.user

function leaveRoom() {
 //make store stop listening to this room
}


/**
 * this method has to be modified
 */
function sendChat() {
    //for the room id we can create a getter in Chat store and
    //assign it here

    //why do we need the roomId

    //TODO also tomorrow we can show a real name instead if usersId. user is stored in userStore so it shouldnt be a problem  
    let chatToSend = { text: txtChatInput.value, roomName: chatStore.roomName,
     userId: Date.now() % 234 }; // we need a user id from userStore (not merged yet with main branch)
    //we need to get an id of the chat
    console.log("text:: "+ chatToSend.text)
    chatStore.createChat(chatToSend);
}
</script>

<style scoped>

</style>