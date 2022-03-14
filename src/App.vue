<script setup lang="ts">
import {provide} from "vue";
import {UserService} from "@/services/UserService";
import {RoomService} from "@/services/RoomService";

provide("userService", new UserService());
provide("roomService", new RoomService());

</script>

<template>
  <RouterLink to="/users">Users</RouterLink> |
  <RouterLink to="/rooms">Rooms</RouterLink>
  <RouterView />
</template>

<style>
@import 'assets/base.css';

</style>
