<template>
  <div class="flex justify-center h-screen w-screen">
  <div class="container drop-shadow-light p-5 flex-col bg-slate-900 border-2 border-indigo-400 rounded-xl w-2/5 h-2/3">

    <!--HEADER-->
    <div class="mb-5">
      <SortMenu @sort="sortUsers" class="float-right"/>
      <h2 class="text-xl font-bold text-indigo-300 text-center">Users</h2>
    </div>

    <!--SEARCH FIELD-->
    <form class="group relative mb-5">
      <SearchIcon class="h-6 w-6 absolute left-3 top-1/2 -mt-2.5 pointer-events-none stroke-slate-100"/>
      <input class="text-slate-100 focus:ring-2 focus:ring-slate-700 focus:outline-none appearance-none w-full 
      text-sm leading-6 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-700 shadow-sm bg-slate-700" 
      type="text" aria-label="Filter projects"
             placeholder="Search..." v-model="searchInput">
    </form>

    <!--REQUESTS-->
    <div class="w-full my-5 block py-5 border-y-2 border-slate-700">
      <h3 class="font-semibold text-lg text-indigo-300">Friend requests</h3>
      <div v-for="request in friendRequests" class="flex flex-row gap-4">
        <div class="font-semibold text-slate-100">{{ request.username }}</div>
        <CheckIcon class="h-6 w-6 stroke-slate-100"/>
        <XIcon class="h-6 w-6 stroke-slate-100"/>
      </div>
      <div v-if="friendRequests.length==0" class="italic text-slate-400">You have no friend requests</div>
    </div>

    <!--FRIENDS LIST-->
    <div class="w-full overflow-y-scroll h-2/3">
      <h3 class="font-semibold text-lg text-indigo-300">All users</h3>
    <table class="table-fixed w-full">
      <tbody>
        <tr v-for="user in filteredUsers" class="border-b-2 border-slate-700 hover:bg-slate-800">
          <!--NAME-->
          <td class="basis 1/2 font-semibold text-slate-100">{{ user.username }}</td>
          <!--STATUS & ICON-->
          <td class="basis 1/2">
            <div v-if="user.status == 'FRIENDS'" class="flex flex-row gap-4">
              <div class="italic text-slate-100">friends</div>
              <UserGroupIcon class="h-6 w-6 stroke-slate-100"/>
            </div>
            <div v-else-if="user.status == 'NONE'" class="flex flex-row gap-4">
              <UserAddIcon class="h-6 w-6 stroke-slate-100 hover:cursor-pointer"/>
            </div>
            <div v-else-if="user.status == 'INVITATIONSENT'" class="flex flex-row gap-2 items-center">
              <div class="italic text-slate-100">your request is pending...</div>
              <ClockIcon class="w-5 h-5 stroke-slate-100"/>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import {computed, inject, ref} from "vue";
import SortMenu from '@/components/SortMenu.vue'
import {UserGroupIcon, UserAddIcon, CheckIcon, XIcon, SearchIcon, ClockIcon} from "@heroicons/vue/outline";
import * as _ from 'underscore';
import type {GetUsersDto} from "@/dtos/user/GetUsersDto";
import {UserService} from "@/services/UserService";
import {UserStore} from "@/stores/UserStore";

const userService = inject<UserService>("userService");
const userStore = UserStore();
const loggedUserId = userStore.id;

const searchInput = ref("");
const sortType = ref("none"); //none ; friendStatus ; alphabetically
const users = ref([]);
const friendRequests = ref([]);

userService?.getAllUsers(loggedUserId)
    .then((response) => {
      users.value = response.data as GetUsersDto[];
      friendRequests.value = users.value.filter((user) => user.status=="INVITATIONRECEIVED")
      users.value = users.value.filter((user) => user.status!="INVITATIONRECEIVED")
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