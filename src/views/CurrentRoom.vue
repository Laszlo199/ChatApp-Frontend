<template>
  <div class="flex justify-center w-screen h-screen overflow-hidden bg-slate-900">

    <div class="container flex-col w-3/5 h-full">

      <!--HEADER-->
      <div class="mb-5">
        <h2 class="text-xl font-bold text-slate-100 text-center">Room: {{chatStore.roomName}}</h2>
      </div>      

      <!--CHATS-->
      <div class="w-full h-96 overflow-y-scroll">
        <p class="italic text-slate-400 text-center">you joined the room</p>
        <div v-for="chat in chatStore.chats" v-bind:key="chat.text"
          class="flex-row">
          <span class="font-bold text-indigo-300">{{chat.userN}}: </span>
          <span class="text-slate-100">{{chat.text}}</span>
        </div>
        <div v-for="(user, index) in chatStore.typingArray" v-bind:key="index">
          <p v-if="user!=userStore.userName" class="italic text-slate-400">{{user}} is typing...</p>
        </div>
      </div>

      <!--INPUT FIELD-->
      <form @submit.prevent="sendChat" class="fixed bottom-20 group flex flex-row w-3/5 h-16 p-2 space-x-2">
        <input class="basis-4/5 text-slate-100 focus:ring-2 focus:ring-slate-700 focus:outline-none appearance-none w-full 
        text-sm leading-6 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-700 shadow-sm bg-slate-700" 
        type="text" aria-label="Filter projects"
                placeholder="Message..." v-model="txtChatInput" @input="checkTyping()">
        <button class="basis-1/5 text-black font-semibold rounded bg-indigo-300 hover:bg-indigo-200">Send</button>
      </form>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatStore } from "@/stores/ChatStore";
import { computed, ref } from "vue";
import { UserStore } from "@/stores/UserStore";
import _ from "underscore";

const chatStore = ChatStore();
const userStore = UserStore()
const txtChatInput = ref("");

function sendChat() {
    let chatToSend = { text: txtChatInput.value, roomName: chatStore.roomName, userN: userStore.userName};
    chatStore.createChat(chatToSend);
    txtChatInput.value='';
    chatStore.stopTyping(userStore.userName);
}

var checkTyping = _.debounce( ()=>{
    if(txtChatInput.value.length>0) chatStore.startTyping(userStore.userName);
    else chatStore.stopTyping(userStore.userName);
  }, 200, false );

</script>

<style scoped>

</style>