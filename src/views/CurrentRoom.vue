<template>

  <div class="flex justify-center h-screen w-screen">
    <div class="container drop-shadow-md p-5 flex-col bg-slate-100 rounded-xl w-2/5 h-2/3">

      <!--HEADER-->
      <div class="mb-5">
        <h2 class="text-xl font-bold text-slate-900 text-center">Room: </h2>
      </div>

    <!--SEARCH FIELD-->
      <form class="group relative mb-5">
        <SearchIcon class="h-6 w-6 stroke-slate-300 bg-red-300 absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"/>
        <input class="focus:ring-2 focus:ring-slate-400 focus:outline-none appearance-none w-2/3 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter projects"
               placeholder="Message..." v-model="searchInput">
        <button class="text-black m-12 w-1/6 py-1.5 rounded bg-slate-500">Send</button>    
      </form>




      <!--Messages LIST-->
      <div class="w-full overflow-y-scroll h-2/3">
        <table class="table-auto w-full">
       
        
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//we need to pass a user for sure --> we dont cause we store them in userStore
//we need to pass 

</script>

<style scoped>

</style>