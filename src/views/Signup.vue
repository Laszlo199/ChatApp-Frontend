<template>
  <div class="min-h-screen flex items-center justify-center">

    <!--login box    -->
    <div class="px-16 shadow-2xl pt-16 pb-11 rounded-2xl  w-1/3 bg-amber-100">

      <h3  class="text-slate-900 font-bold text-5xl mb-12 text-center	">{{signingUp}}</h3>

      <form class="text-slate-900 space-y-7 py-2 px-4">
        <div class="">
          <label class="block mb-1 font-bold text-gray-500">Username: </label>
          <input v-model="username" class="border border-gray-400 p-3 w-full rounded-xl outline-none
          focus:border-b-blue-600 border-2" type="text" placeholder="insert username..">
        </div>

        <div class="">
          <label class="block mb-1 font-bold text-gray-500">Password: </label>
          <input v-model="password" class="border border-gray-400 p-3 w-full rounded-xl
          outline-none focus:border-b-blue-600 border-2" type="password" placeholder="insert password..">
        </div>

        <div class="ml-2 text-gray-800 font-bold text-blue-600
        outline-none hover:text-blue-900">
          <label  @click="changeSignUp">I don't have an account. Sign up instead!</label>
        </div>

        <button @click="signIn" class="block w-full bg-purple-600 py-4 rounded
        text-purple-900 font-bold text-base hover:bg-purple-500">{{signingUp}}</button>
      </form>

    </div>
  </div>

</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import type { UserService } from "@/services/UserService";
import type { UserCredentialsDto } from "@/dtos/userCredentialsDto";
import type { GetUsersDto } from "@/dtos/GetUsersDto";
const username = ref("")
const password = ref("")
const signingUp = ref("Sign in");
const userService = inject<UserService>("userService");
const isLoggedIn = ref(false)
const loggedUser= ref();


function changeSignUp(){
  if(signingUp.value ==="Sign in")
    signingUp.value = "Sign Up";
  else
    signingUp.value = "Sign in";
}

 function signIn(){
  if(username.value && password.value){

    console.log(username.value)
    console.log(password.value)

  userService?.signIn({username: username.value,
    password: password.value}).then(
    response =>{
      loggedUser.value = response.data as GetUsersDto;
    }
  ).catch((error) => {
      console.log("error: " + error.message);
    });

    if(loggedUser){
      console.log("id: "+ loggedUser.value?.id+ "      username: " +loggedUser.value?.username)
    } else{
      console.log("such user doesnt exist")
    }


    

  }


}

</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;


</style>
