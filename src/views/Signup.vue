<template>
  <div class="min-h-screen flex items-center justify-center">

    <!--login box    -->
    <div class="px-16 shadow-2xl pt-16 pb-11 rounded-2xl  w-1/3 bg-amber-100">

      <h3  class="text-slate-900 font-bold text-5xl mb-12 text-center	">{{signingUp}}</h3>

      <form @submit.prevent="signIn" class="text-slate-900 space-y-7 py-2 px-4">
        <div class="">
          <label class="block mb-1 font-bold text-gray-500">Username: </label>
          <input v-model="username" class="border border-gray-400 p-3 w-full rounded-xl outline-none
          focus:border-b-blue-600 border-2" type="text" placeholder="insert username..">
          <div class="pt-1">
          <label class=" pl-0.5 text-red-700 "
          v-show="showMessage">{{messageIfSth}}</label> </div><!--remember to delete '!' just for the sake of design we keep it    -->
        </div>

        <div class="">
          <label class="block mb-1 font-bold text-gray-500">Password: </label>
          <input v-model="password" class="border border-gray-400 p-3 w-full rounded-xl
          outline-none focus:border-b-blue-600 border-2" type="password" placeholder="insert password..">
        </div>

        <div class=" ml-2 text-gray-800 font-bold text-blue-600
        outline-none hover:text-blue-900">
          <label  @click="changeSignUp">{{info}}</label>
        </div>

        <button @click="signIn" class="block w-full bg-purple-600 py-4 rounded
        text-purple-900 font-bold text-base hover:bg-purple-500">{{signingUp}}</button>
      </form>

    </div>
  </div>

</template>

<script setup lang="ts">
import type { GetUsersDto } from "@/dtos/GetUsersDto";
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
const messageIfSth = ref("Username doesn't exist or pass is wrong")

//when we show info about empty field after each try we need to get back to default value corresponding to view
//for each try at the very begining of sign in we will invoke needed method





function changeSignUp(){
  showMessage.value = false;

  if(signingUp.value ==="Sign in"){
    signingUp.value = "Sign Up";
    info.value = "hmm ..Sign in anyway!"
    messageIfSth.value = "Username already exist";//it must be opposite
    }
  else{
    signingUp.value = "Sign in";
    info.value = "I don't have an account. Sign up instead!" //where we will switch 
    messageIfSth.value = "Username doesn't exists or pass is wrong"; //it must be opposite
    }
}

async function signIn(this: any){
  if(!username.value){
    showMessage.value= true;
    messageIfSth.value = "empty username .."
  }else{
    if(signingUp.value ==="Sign in")
        messageIfSth.value = "Username doesn't exists or pass is wrong";
    else
        messageIfSth.value = "Username already exists";

  }
    

    if(username.value && password.value){
      showMessage.value = false; //go to default in case it was selected

      console.log(username.value)
      console.log(password.value)

      if(signingUp.value ==="Sign in"){
          await userService?.signIn({username: username.value,
            password: password.value}).then(
            response =>{
              loggedUser.value = response.data as GetUsersDto;
            }
          ).catch((error) => {
              console.log("error: " + error.message);
            });
      }


      else if(signingUp.value ==="Sign Up"){
          await userService?.signUp({username: username.value,
            password: password.value}).then(
            response =>{
              loggedUser.value = response.data as GetUsersDto;
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
@tailwind base;
@tailwind components;
@tailwind utilities;


</style>
