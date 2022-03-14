<template>
  <div class="min-h-screen flex items-center justify-center">

    <!--login box    -->
    <div class="px-16 shadow-2xl pt-16 pb-11 rounded-2xl shadow-2xl w-1/3 bg-amber-100">

      <h3 class="text-slate-900 font-bold text-5xl mb-12 text-center	">Sign In</h3>

      <form class="text-slate-900 space-y-7 py-2 px-4">
        <div class="">
          <label class="block mb-1 font-bold text-gray-500">Username: </label>
          <input class="border border-gray-400 p-3 w-full rounded-xl outline-none
          focus:border-b-blue-600 border-2" type="text" placeholder="insert username..">
        </div>

        <div class="">
          <label class="block mb-1 font-bold text-gray-500">Password: </label>
          <input class="border border-gray-400 p-3 w-full rounded-xl
          outline-none focus:border-b-blue-600 border-2" type="password" placeholder="insert password..">
        </div>

        <div class="ml-2 text-gray-800 font-bold text-blue-600
        outline-none hover:text-blue-900">
          <label>I don't have an account. Sign up instead!</label>
        </div>

        <button class="block w-full bg-purple-600 py-4 rounded
        text-purple-900 font-bold text-base hover:bg-purple-500">Sign in</button>
      </form>

    </div>
  </div>

<!--  <div class="home flex justify-center flex-col pt-12 items-center ">
    &lt;!&ndash;banner &ndash;&gt;
    <div class=" text-4xl text-amber-300 text-6xl ">
      <h1>Sign In</h1>
    </div>

    <div class=" rounded-2xl pt-12 container drop-shadow-md p-5 flex-col bg-slate-100 w-2/5 ">
      <div>
        <div class="py-12">
          <input placeholder="username..">
        </div>

        <div>
          <input placeholder="password..">
        </div>
      </div>
    </div>
  </div>-->

</template>

<script setup lang="ts">

</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;


.banner {
  @apply flex justify-center text-4xl text-amber-300 p-32 text-6xl
}

.main_window {
  @apply container drop-shadow-md p-5 flex-col bg-slate-100 rounded-xl w-2/5 h-1/2
}

</style>
