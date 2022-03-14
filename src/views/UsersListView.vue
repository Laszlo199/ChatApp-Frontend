<template>
  <div class="flex justify-center h-screen w-screen">
  <div class="container drop-shadow-md p-5 flex-col bg-slate-100 rounded-xl w-2/5 h-1/2">

    <!--HEADER-->
    <div class="mb-5">
      <SortMenu @sort="sortUsers" class="float-right"/>
      <h2 class="text-lg font-bold text-slate-900 text-center">Users</h2>
    </div>

    <!--SEARCH FIELD-->
    <form class="group relative mb-5">
      <SearchIcon class="h-6 w-6 absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"/>
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
              <UserGroupIcon class="h-6 w-6 stroke-slate-400"/>
            </div>
            <div v-else-if="user.status == 'NONE'">
              <UserAddIcon class="h-6 w-6 stroke-slate-400"/>
            </div>
            <div v-else-if="user.status == 'INVITATIONRECEIVED'" class="flex flex-row">
              <CheckIcon class="h-6 w-6 stroke-slate-400"/>
              <XIcon class="h-6 w-6 stroke-slate-400"/>
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
import {computed, inject, ref} from "vue";
import SortMenu from '@/components/SortMenu.vue'
import {UserGroupIcon, UserAddIcon, CheckIcon, XIcon, SearchIcon} from "@heroicons/vue/outline";
import * as _ from 'underscore';
import type {GetUsersDto} from "@/dtos/GetUsersDto";
import {UserService} from "@/services/UserService";

const userService = inject<UserService>("userService");

const searchInput = ref("");
const sortType = ref("none"); //none ; friendStatus ; alphabetically
const users = ref([]);

//TO CHANGE AFTER MERGING WITH LOGIN FUNCTIONALITY
const loggedUserId = 1;

userService?.getAllUsers(loggedUserId)
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

</script>

<style scoped>

</style>