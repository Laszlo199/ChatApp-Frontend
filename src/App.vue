<script setup lang="ts">
import {provide} from "vue";
import {UserService} from "@/services/UserService";

provide("userService", new UserService());

</script>

<template>
  <RouterLink to="/users">Users</RouterLink>
  <RouterView />
</template>

<style>
@import 'assets/base.css';

</style>
