<template>
  <div class="flex justify-center h-screen w-screen">
  <div class="container drop-shadow-md p-5 flex-col bg-slate-100 rounded-xl w-2/5 h-2/3">

    <!--HEADER-->
    <div class="mb-5">
      <SortMenu @sort="sortUsers" class="float-right"/>
      <h2 class="text-xl font-bold text-slate-900 text-center">Users</h2>
    </div>

    <!--SEARCH FIELD-->
    <form class="group relative mb-5">
      <SearchIcon class="h-6 w-6 absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"/>
      <input class="focus:ring-2 focus:ring-slate-400 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter projects"
             placeholder="Search..." v-model="searchInput">
    </form>

    <!--REQUESTS-->
    <div class="w-full my-5 block py-5 border-y-2 border-slate-300">
      <h3 class="font-semibold text-lg text-slate-900">Friend requests</h3>
      <div v-for="request in friendRequests" class="flex flex-row gap-4">
        <div class="font-medium">{{ request.username }}</div>
        <CheckIcon class="h-6 w-6 stroke-slate-400"/>
        <XIcon class="h-6 w-6 stroke-slate-400"v-on:click="deleteFriendRequests(request)"/>
      </div>
    </div>

    <!--FRIENDS LIST-->
    <div class="w-full overflow-y-scroll h-2/3">
      <h3 class="font-semibold text-lg text-slate-900">All users</h3>
    <table class="table-fixed w-full">
      <tbody>
        <tr v-for="user in filteredUsers" class="border-b-2 border-slate-200 hover:bg-slate-200">
          <!--NAME-->
          <td class="basis 1/2 font-medium">{{ user.username }}</td>
          <!--STATUS & ICON-->
          <td class="basis 1/2">
            <div v-if="user.status == 'FRIENDS'" class="flex flex-row gap-4">
              <div class="italic">friends</div>
              <UserGroupIcon class="h-6 w-6 stroke-slate-400"/>
            </div>
            <div v-else-if="user.status == 'NONE'" class="flex flex-row gap-4">
              <UserAddIcon class="h-6 w-6 stroke-slate-400" v-on:click="createFriendRequest(user)"/>
            </div>
            <div v-else-if="user.status == 'INVITATIONSENT'" class="flex flex-row gap-2 items-center">
              <div class="italic">your request is pending...</div>
              <ClockIcon class="w-5 h-5 stroke-slate-400"/>
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
import type {GetUsersDto} from "@/dtos/GetUsersDto";
import {UserService} from "@/services/UserService";
import { FriendRequestService } from "@/services/FriendRequestService";

const userService = inject<UserService>("userService");
const friendRequestService = inject<FriendRequestService>("friendService");

const searchInput = ref("");
const sortType = ref("none"); //none ; friendStatus ; alphabetically
const users = ref([]);
const friendRequests = ref([]);

//TO CHANGE AFTER MERGING WITH LOGIN FUNCTIONALITY
const loggedUserId = 1;


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

function createFriendRequest(userId: number){

  friendRequestService?.createFriendRequest({senderId: loggedUserId,receiverId: userId,isAccepted: false})
}
function deleteFriendRequests(requestId: number){

  friendRequestService?.deleteFriendRequest(requestId)
}

</script>

<style scoped>

</style>