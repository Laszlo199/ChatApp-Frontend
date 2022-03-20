<script setup lang="ts">
import {provide} from "vue";
import {UserService} from "@/services/UserService";
import {RoomService} from "@/services/RoomService";
import {AnnotationIcon} from "@heroicons/vue/outline";
import { UserStore } from "@/stores/UserStore";
import {useRouter} from "vue-router";
const userStore = UserStore();
const myRouter: any = useRouter();
provide("userService", new UserService());
provide("roomService", new RoomService());

function logOut() {
  userStore.signOut(); myRouter.push('/');
}


</script>

<template>
  <div v-if="userStore.userName" class="bg-slate-500 mb-4 h-16 flex items-center place-content-between px-10">
      <div class="float-left">
        <AnnotationIcon class="w-12 h-12 stroke-white"/>
      </div>
      <div class="flex flex-row-reverse gap-8 items-center text-white">
        <div class="font-semibold hover:font-bold hover:cursor-pointer hover:scale-105"
              @click="logOut">Log out</div> |
        <RouterLink to="/users" class="font-semibold hover:font-bold hover:scale-105">Users</RouterLink> |
        <RouterLink to="/rooms" class="font-semibold hover:font-bold hover:scale-105">Rooms</RouterLink>
      </div>

  </div>

  <RouterView />
</template>

<style>
@import 'assets/base.css';

</style>
