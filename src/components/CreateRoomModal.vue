<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <!--MODAL-->
      <div class="h-48 relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <!--ICON-->
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-slate-100 sm:mx-0 sm:h-10 sm:w-10">
              <PencilAltIcon class="w-6 h-6 stroke-slate-600"/>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <!--TITLE-->
              <h3 class="text-lg leading-6 font-bold text-gray-900" id="modal-title">Creating new room</h3>
              <!--INPUT-->
              <div class="mt-2">
                <input v-model="roomNameInput" placeholder="name..." :maxlength="max" class="focus:outline-none w-full"/>
              </div>
              <!--SUCCESSFULLY ADDED-->
              <div v-if="wasSuccess" class="mt-2">
                <p class="italic text-sky-500">Room successfully added!</p>
              </div>
              <!--MAX CHARACTERS-->
              <div v-if="maxCharInfo.length>0 && !wasSuccess">
                <p class="italic text-slate-400">{{maxCharInfo}}</p>
              </div>
            </div>
          </div>
        </div>
        <!--DIV WITH BUTTONS-->
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse fixed bottom-0 w-full rounded-lg">
          <div v-if="!wasSuccess">
            <button @click="createRoom" type="button" v-bind:class="{ 'bg-slate-400': roomNameInput.length<3, 'hover:bg-slate-700': roomNameInput.length>=3, 'hover:cursor-not-allowed': roomNameInput.length<3 }"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
              Create</button>
            <button @click="$emit('close', false)" type="button"
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel</button>
          </div>
          <div v-else>
            <button @click="goToRoom()" type="button"
                    class="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
              <div>Go to your room</div>
              <ChevronRightIcon class="w-4 h-4"/>
            </button>
            <button @click="$emit('close', false)" type="button"
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Back</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {PencilAltIcon, ChevronRightIcon} from "@heroicons/vue/outline";
import {computed, inject, ref} from "vue";
import {RoomService} from "@/services/RoomService";

const roomService = inject<RoomService>("roomService");

const max = 35; //max number of characters for room name
const roomNameInput = ref("");
const wasSuccess = ref(false);

let newRoomId=0;

const maxCharInfo = computed(()=> {
  if(roomNameInput.value.length==max) return "Max. "+max+" characters";
  else return "";
})

function createRoom() {
  if(roomNameInput.value.length>2) {
    roomService?.createRoom(roomNameInput.value).then((data) => {
      wasSuccess.value = true;
      newRoomId=data.id;
      console.log(data);
    }).catch((error) => console.log("error: " + error));
  }
}

function goToRoom() {
  if(newRoomId!=0){
    console.log(newRoomId);
    //TODO go to created room
  }
}
</script>

<style scoped>

</style>