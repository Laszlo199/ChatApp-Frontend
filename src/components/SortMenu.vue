<template>
  <div class="relative inline-block text-left w-24px z-10">
    <!--BUTTON-->
    <div @click="toggleDropdown()" class="hover:cursor-pointer">
    <button>
      <DotsVerticalIcon class="h-6 w-6 stroke-slate-200 hover:stroke-indigo-300"/>
    </button>
    </div>

    <!--DROPDOWN-->
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
    <div v-if="isVisible" class="bg-slate-600 text-right origin-top-right absolute right-0 mt-2 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <div class="py-1" role="none">
        <div class="text-slate-100 block px-4 py-2 font-bold text-md border-b-2 border-slate-300">
          Sort users
        </div>

        <button @click="$emit('sort', 'alphabetically'); toggleDropdown()"
                class="text-slate-100 px-4 py-2 text-sm flex flex-row items-center hover:text-indigo-300" role="menuitem" tabindex="-1" id="menu-item-1">
          <SortDescendingIcon class="h-6 w-6 stroke-slate-100"/>
          <p class="text-right pl-2">Alphabetically</p>
        </button>

        <button @click="$emit('sort', 'friendStatus'); toggleDropdown()"
                class="text-slate-100 px-4 py-2 text-sm flex flex-row items-center hover:text-indigo-300" role="menuitem" tabindex="-1" id="menu-item-2">
          <UsersIcon class="h-6 w-6 stroke-slate-100"/>
          <p class="text-right pl-2">Friend status</p>
        </button>
      </div>
    </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {UsersIcon, SortDescendingIcon, DotsVerticalIcon} from "@heroicons/vue/outline";

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