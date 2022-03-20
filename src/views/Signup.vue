<template>
  <div class="min-h-screen flex items-center justify-center">

    <!--login box    -->
    <div class="px-16 shadow-2xl pt-16 pb-11 rounded-2xl  w-1/3 bg-slate-800">

      <h3  class="text-slate-100 font-bold text-5xl mb-12 text-center">{{signingUp}}</h3>

      <form @submit.prevent="signIn" class="text-slate-900 space-y-7 py-2 px-4">
        <div class="">
          <label class="block mb-1 font-bold text-indigo-300">Username: </label>
          <input v-model="username" class="border-indigo-300 bg-slate-800 text-slate-100 p-3 w-full rounded-xl outline-none
          focus:border-indigo-500 border-2" type="text" placeholder="enter your username...">
          <div class="pt-1">
            <label class=" pl-0.5 text-red-500 "
            v-show="showMessage">{{messageIfSth}}</label> 
          </div>
        </div>

        <div class="">
          <label class="block mb-1 font-bold text-indigo-300">Password: </label>
          <input v-model="password" class="border-indigo-300 bg-slate-800 text-slate-100 p-3 w-full rounded-xl
          outline-none focus:border-indigo-500 border-2" type="password" placeholder="enter your password...">
        </div>

        <div class="ml-2 text-indigo-300 outline-none hover:text-indigo-100 hover:cursor-pointer">
          <label clas="hover:cursor-pointer" @click="changeSignUp">{{info}}</label>
        </div>

        <button @click="signIn" class="block w-full bg-purple-600 py-4 rounded
        text-slate-100 font-bold text-base hover:bg-purple-500">{{signingUp}}</button>
      </form>

    </div>
  </div>

</template>

<script setup lang="ts">
import type { GetUserDto } from "@/dtos/user/GetUserDto";
import type { UserService } from "@/services/UserService";
import { UserStore } from "../stores/userStore";
import { inject, ref } from "vue";
import { useRouter } from 'vue-router'
const username = ref("")
const password = ref("")
const signingUp = ref("Sign in");
const userService = inject<UserService>("userService");
const loggedUser= ref();
const userStore = UserStore();
const myRouter: any = useRouter();
const info = ref("I don't have an account. Sign up instead!")
const showMessage = ref(false);
const messageIfSth = ref("Username doesn't exist or the password is wrong")

function changeSignUp(){
  showMessage.value = false;

  if(signingUp.value ==="Sign in"){
    signingUp.value = "Sign Up";
    info.value = "I have an account already. Sign in instead."
    messageIfSth.value = "Username already exists";
    }
  else{
    signingUp.value = "Sign in";
    info.value = "I don't have an account. Sign up instead!"
    messageIfSth.value = "Username doesn't exist or the password is wrong";
    }
}

async function signIn(this: any){
  if(!username.value){
    showMessage.value= true;
    messageIfSth.value = "username cannot be empty!"
  }else{
    if(signingUp.value ==="Sign in")
        messageIfSth.value = "Username doesn't exists or the password is wrong";
    else
        messageIfSth.value = "Username already exists";
  }
    

    if(username.value && password.value){
      showMessage.value = false; //go to default in case it was selected

      if(signingUp.value ==="Sign in"){
          await userService?.signIn({username: username.value,
            password: password.value}).then(
            response =>{
              loggedUser.value = response.data as GetUserDto;
            }
          ).catch((error) => {
              console.log("error: " + error.message);
            });
      }


      else if(signingUp.value ==="Sign Up"){
          await userService?.signUp({username: username.value,
            password: password.value}).then(
            response =>{
              loggedUser.value = response.data as GetUserDto;
              console.log(response.data);
            }
          ).catch((error) => {
              console.log("error: " + error.message);
            });
      }

      if(loggedUser.value?.id!==undefined){
        console.log("id: "+ loggedUser.value?.id+ "      username: " +loggedUser.value?.username)
        //sign in
        userStore.signInUser(loggedUser.value);
        //go to other page
        myRouter.push('users');

      } else{
        if(signingUp.value ==="Sign in"){
           console.log("such user doesnt exist")
           //TODO show label for 30 seconds that such user doesnt exist
           showMessage.value = true;
        }
        else{
          console.log("username already exists")
          //TODO show label for 30 seconds that username already exists
          showMessage.value = true;
          }
      }
    }

}



</script>

<style scoped>

</style>
