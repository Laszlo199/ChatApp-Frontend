<template>
  <div class="flex justify-center h-screen w-screen">
  <div class="container drop-shadow-md p-5 flex-col bg-slate-100 rounded-xl w-2/5 h-1/2">

    <!--HEADER-->
    <div class="mb-5">
      <SortMenu @sort="sortUsers" class="float-right"/>
      <h2 class="text-lg font-bold text-slate-900 text-center" @click="clickkk">Users</h2>
    </div>

    <!--SEARCH FIELD-->
    <form class="group relative mb-5">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter projects"
             placeholder="Search..." v-model="searchInput">
    </form>

    <!--FRIENDS LIST-->
    <table class="table-auto w-full overflow-y-scroll">
      <tbody>
        <tr v-for="user in filteredUsers" class="border-b-2 border-slate-300">
          <!--NAME-->
          <td class="basis 1/2">{{ user.username }}</td>
          <!--STATUS ICON-->
          <td class="basis 1/4">
            <div v-if="user.status == 'FRIENDS'">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div v-else-if="user.status == 'NONE'">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div v-else-if="user.status == 'INVITATIONRECEIVED'" class="flex flex-row">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </td>
          <!--STATUS TEXT-->
          <td class="basis 1/4">
            <div v-if="user.status == 'FRIENDS'">
              friends
            </div>
            <div v-else-if="user.status == 'NONE'">
              click to add a friend
            </div>
            <div v-else-if="user.status == 'INVITATIONRECEIVED'">
              friend request received
            </div>
            <div v-else-if="user.status == 'INVITATIONSENT'">
              request status pending...
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script setup lang="ts">
import {computed, inject, onMounted, ref} from "vue";
import SortMenu from '@/components/SortMenu.vue'
import * as _ from 'underscore';
import type {GetUsersDto} from "@/dtos/GetUsersDto";
import {UserService} from "@/services/UserService";

const userService = inject<UserService>("userService");

const searchInput = ref("");
const sortType = ref("none"); //none ; friendStatus ; alphabetically
const users = ref([]);

userService?.getAllUsers()
    .then((response) => {
      users.value = response.data as GetUsersDto[];
    })
    .catch((error) => {
      console.log("error: " + error);
    });

const filteredUsers = computed(()=> {
  if(sortType.value=='none')
    return users.value.filter(user => user.username.toLowerCase().includes(searchInput.value.toLowerCase()));
  else if(sortType.value=="friendStatus")
    return _.sortBy(users.value,['status'])
        .filter(user => user.username.toLowerCase().includes(searchInput.value.toLowerCase()));
  else if(sortType.value=='alphabetically') {
    return _.sortBy(users.value,['username'])
        .filter(user => user.username.toLowerCase().includes(searchInput.value.toLowerCase()))
  }
})

function sortUsers(type) {
  sortType.value = type;
}

function clickkk() {
  sortType.value = "alphabetically";
}

</script>

<style scoped>

</style>