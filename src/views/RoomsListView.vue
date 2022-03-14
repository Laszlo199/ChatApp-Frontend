<template>
  <!--MODAL-->
  <CreateRoomModal v-if="isModalOpen" @close="isModalOpen=false; refreshList()"/>

  <div class="flex justify-center h-screen w-screen">
    <div class="container drop-shadow-md p-5 flex-col bg-slate-100 rounded-xl w-2/5 h-2/3">

      <!--HEADER-->
      <div class="mb-5">
        <PlusCircleIcon @click="isModalOpen=true" class="h-6 w-6 stroke-slate-400 float-right hover:stroke-slate-600 cursor-pointer z-10"/>
        <h2 class="text-lg font-bold text-slate-900 text-center">Rooms</h2>
      </div>

      <!--SEARCH FIELD-->
      <form class="group relative mb-5">
        <SearchIcon class="h-6 w-6 stroke-slate-300 bg-red-300 absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"/>
        <input class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter projects"
               placeholder="Search..." v-model="searchInput">
      </form>

      <!--ROOMS LIST-->
      <div class="w-full overflow-y-scroll h-2/3">
        <table class="table-auto w-full">
          <tbody>
          <tr v-for="room in filteredRooms" class="hover:bg-slate-200">
            <!--NAME-->
            <td class="basis 1/4">
              <div class="font-semibold">{{ room.name }}</div>
            </td>
            <!--AUTHOR-->
            <td class="basis 1/2" v-bind:class="{ italic: room.author=='you' }">{{room.author}}</td>
            <!--JOIN BTN-->
            <td class="basis 1/4 float-right">
              <button class="flex flex-row items-center h-8 px-6 rounded-md border border-slate-200 bg-white hover:scale-105" >
                <div class="font-medium text-slate-900">join</div>
                <ChevronRightIcon class="h-4 w-4 stroke-slate-400"/>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {PlusCircleIcon, ChevronRightIcon, SearchIcon} from "@heroicons/vue/outline";
import {computed, inject, ref} from "vue";
import CreateRoomModal from "@/components/CreateRoomModal.vue";
import {RoomService} from "@/services/RoomService";
import type {GetRoomsDto} from "@/dtos/GetRoomsDto";

const isModalOpen = ref(false);
const searchInput = ref("");
const rooms = ref([]);

const roomService = inject<RoomService>("roomService");

//TO CHANGE AFTER MERGING WITH LOGIN FUNCTIONALITY
const loggedUserId = 1;

roomService?.getAllRooms(loggedUserId)
    .then((result) => rooms.value = result.data as GetRoomsDto[])
    .catch((error)=>console.log("error: "+error))


const filteredRooms = computed(()=> {
  return rooms.value.filter(room => room.name.toLowerCase().includes(searchInput.value.toLowerCase())
      || room.author.toLowerCase().includes(searchInput.value.toLowerCase()));
})

function refreshList() {
  roomService?.getAllRooms(loggedUserId)
      .then((result) => rooms.value = result.data as GetRoomsDto[])
      .catch((error)=>console.log("error: "+error))
}

</script>

<style scoped>

</style>