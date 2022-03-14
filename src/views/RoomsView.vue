<template>
  <div class="flex justify-center h-screen w-screen">
    <div class="container drop-shadow-md p-5 flex-col bg-slate-100 rounded-xl w-2/5 h-1/2">

      <!--HEADER-->
      <div class="mb-5">
        <PlusCircleIcon class="h-6 w-6 stroke-slate-400 float-right hover:stroke-slate-600"/>
        <h2 class="text-lg font-bold text-slate-900 text-center">Rooms</h2>
      </div>

      <!--SEARCH FIELD-->
      <form class="group relative mb-5">
        <SearchIcon class="h-6 w-6 absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"/>
        <input class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter projects"
               placeholder="Search..." v-model="searchInput">
      </form>

      <!--ROOMS LIST-->
      <table class="table-auto w-full overflow-y-scroll">
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
</template>

<script setup lang="ts">
import {PlusCircleIcon, ChevronRightIcon} from "@heroicons/vue/outline";
import {computed, ref} from "vue";

const searchInput = ref("");
const rooms = ref([{author: "Maya", name: "happy people"},
  {author: "john67", name: "geeeeeks"},
  {author: "you", name: "i didnt have idea"},]);

const filteredRooms = computed(()=> {
  return rooms.value.filter(room => room.name.toLowerCase().includes(searchInput.value.toLowerCase())
      || room.author.toLowerCase().includes(searchInput.value.toLowerCase()));
})

</script>

<style scoped>

</style>