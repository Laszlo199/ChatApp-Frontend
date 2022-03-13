<template>
  <div class="relative inline-block text-left w-24px z-10">
    <!--BUTTON-->
    <div @click="toggleDropdown()" class="hover:cursor-pointer">
    <button>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-slate-400 hover:stroke-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
    </button>
    </div>

    <!--DROPDOWN-->
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
    <div v-if="isVisible" class="text-right origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <div class="py-1" role="none">
        <div class="text-gray-700 block px-4 py-2 font-semibold border-b-2 border-slate-300">
          Sort users
        </div>

        <button @click="$emit('sort', 'alphabetically'); toggleDropdown()"
                class="text-gray-700 block px-4 py-2 text-sm flex flex-row items-center hover:bg-gray-100" role="menuitem" tabindex="-1" id="menu-item-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          <p class="text-right pl-2">Alphabetically</p>
        </button>
        <button @click="$emit('sort', 'friendStatus'); toggleDropdown()"
                class="text-gray-700 block px-4 py-2 text-sm flex flex-row items-center hover:bg-gray-100" role="menuitem" tabindex="-1" id="menu-item-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p class="text-right pl-2">Friend status</p></button>
      </div>
    </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";

const isDropdown = ref(false);

function toggleDropdown() {
  isDropdown.value = !isDropdown.value;
}

const isVisible = computed(()=> {
  return isDropdown.value;
})
</script>

<style scoped>

</style>