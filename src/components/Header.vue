<script setup lang="ts">
import { ref } from 'vue'
import { useSidebar } from '../composables/useSidebar'

// Estado de dropdown y uso de composable
const dropdownOpen = ref(false)
const { isOpen } = useSidebar()

// Definición del nombre del componente
defineOptions({
  name: 'Header',
})
</script>

<template>
  <header class="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-gray-300">
    <div class="flex items-center">
      <!-- BUTTON-ELEMENTO PARA CARGAR EL NAV -->
      <button class="text-gray-500 focus:outline-none lg:hidden" @click="isOpen = true">
        <svg
          class="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <!-- DIV-ELEMENTO BUSCADOR -->
      <div class="relative mx-4 lg:mx-0">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>

        <input
          class="w-32 pl-10 pr-4 text-black border-gray-200 rounded-md sm:w-64 focus:border-gray-300 focus:ring focus:ring-opacity-40 focus:ring-gray-300"
          type="text"
          placeholder="Buscar"
        >
      </div>

    </div>

    <div class="flex items-center">
      <span class="font-medium text-gray-600 dark:text-gray-300 mr-4">Administrador</span>
      <div class="relative">
        <!-- BUTTON-ELEMENTO IMAGEN -->
        <button class="relative z-10 block w-10 h-10 overflow-hidden rounded-full shadow focus:outline-none" @click="dropdownOpen = !dropdownOpen">
         
          <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span class="font-medium text-gray-600 dark:text-gray-300">LQ</span>
          </div>
          
        </button>

        <div v-show="dropdownOpen" class="fixed inset-0 z-10 w-full h-full" @click="dropdownOpen = false"></div>
        
        <!-- LOG-OUT -->
        <transition
          enter-active-class="transition duration-150 ease-out transform"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in transform"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
           <!-- DIV-ELEMENTO LOG OUT -->
          <div v-show="dropdownOpen" class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E7504D] hover:text-white">Perfil</a>
            <router-link to="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E7504D] hover:text-white">
             Cerrar Sesion 
            </router-link>
          </div>

        </transition>

      </div>

    </div>
  </header>
</template>

