<script setup lang="ts">
import { ref } from 'vue'
import { useSidebar } from '../composables/useSidebar'

// Usa el composable useSidebar
const { isOpen } = useSidebar()

// Clases activas e inactivas
const activeClass = ref(
  'bg-[#BC0000] text-white border-[#BC0000]' // Fondo rojo y texto blanco
)
const inactiveClass = ref(
  'border-[#BC0000] text-white hover:bg-[#E7504D] hover:text-white' // Fondo hover y texto blanco
)
// Estado para el submenú
const isSubMenuOpen = ref(false)
const isSubMenuOpen1 = ref(false)
// Exportar el nombre del componente
defineOptions({
  name: 'Sidebar',
})
</script>


<template>
  <div class="flex">
    <!-- Backdrop -->
    <div :class="isOpen ? 'block' : 'hidden'" class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden" @click="isOpen = false"></div>
    <!-- End Backdrop -->

    <div :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
          class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-[#BC0000] lg:translate-x-0 lg:static lg:inset-0">
      
          <!-- TITULO DE NAVBAR -->
      <div class="flex items-center justify-center mt-4">
        <div class="flex items-center">
          <img src="/logo01.jpg" alt="Logo" class="h-30 w-36 mx-2" /> <!-- Añadir imagen -->
          
        </div>
      </div>

      <nav class="mt-8">
        <!-- HOME -->
        <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Dashboard' ? activeClass : inactiveClass]" to="/dashboard">
          
          <svg
            class="w-5 h-5"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
              fill="currentColor"
            />
            <path
              d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z"
              fill="currentColor"
            />
          </svg>
          <span class="mx-4 text-sidebar-span">Home</span>

        </router-link>

        <!-- ROLES Y PERMISOS -->
        <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'rolList' ? activeClass : inactiveClass]" to="/rolList">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
          </svg>

          <span class="mx-4 text-sidebar-span">Roles y Permisos</span>
        </router-link>


        <!-- USUARIOS -->
        <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'userList' ? activeClass : inactiveClass]" to="/userList">
          <svg
            class="w-5 h-5"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 3C3.89543 3 3 3.89543 3 5V7C3 8.10457 3.89543 9 5 9H7C8.10457 9 9 8.10457 9 7V5C9 3.89543 8.10457 3 7 3H5Z"
              fill="currentColor"
            />
            <path
              d="M5 11C3.89543 11 3 11.8954 3 13V15C3 16.1046 3.89543 17 5 17H7C8.10457 17 9 16.1046 9 15V13C9 11.8954 8.10457 11 7 11H5Z"
              fill="currentColor"
            />
            <path
              d="M11 5C11 3.89543 11.8954 3 13 3H15C16.1046 3 17 3.89543 17 5V7C17 8.10457 16.1046 9 15 9H13C11.8954 9 11 8.10457 11 7V5Z"
              fill="currentColor"
            />
            <path
              d="M11 13C11 11.8954 11.8954 11 13 11H15C16.1046 11 17 11.8954 17 13V15C17 16.1046 16.1046 17 15 17H13C11.8954 17 11 16.1046 11 15V13Z"
              fill="currentColor"
            />
          </svg>
          <span class="mx-4 text-sidebar-span">Usuarios</span>
        </router-link>

        <!-- REGISTROS -->
        <div @click="isSubMenuOpen = !isSubMenuOpen" class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4 cursor-pointer"
          :class="[$route.name === 'Registros' ? activeClass : inactiveClass]">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
            />
            <path
              fill-rule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="mx-4 text-sidebar-span">Registros</span>
        </div>

        <!-- Submenú -->
        <div v-if="isSubMenuOpen" class="ml-4">
          <router-link class="flex items-center block px-6 py-2 text-white hover:bg-[#E7504D] rounded" :class="[$route.name === 'clienteList' ? 'bg-[#E7504D]' : '']" to="/clienteList">
            <svg class="h-5 w-5 text-stone-100" fill="none" viewBox="0 0 20 20" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <span class="mx-4 text-sidebar-span">Clientes</span>
          </router-link>

          <router-link class="flex items-center block px-6 py-2 text-white hover:bg-[#E7504D] rounded"
            :class="[$route.name === 'vehiculoList' ? 'bg-[#E7504D]' : '']" to="/vehiculoList">
            <svg class="h-5 w-5 text-stone-100" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  
              <path stroke="none" d="M0 0h24v24H0z"/>  
              <circle cx="7" cy="17" r="2" />  
              <circle cx="17" cy="17" r="2" />  
              <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
            </svg>
            <span class="mx-4 text-sidebar-span">Vehiculos</span>
          </router-link>

          <router-link class="flex items-center block px-6 py-2 text-white hover:bg-[#E7504D] rounded"
            :class="[$route.name === 'choferList' ? 'bg-[#E7504D]' : '']" to="/choferList">
            <svg class="h-5 w-5 text-stone-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  
              <polyline points="23 4 23 10 17 10" />  
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            <span class="mx-4 text-sidebar-span">Choferes</span>
          </router-link>
        </div>

        <!-- PROCESOS -->
        <router-link  @click="isSubMenuOpen1 = !isSubMenuOpen1" class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Procesos' ? activeClass : inactiveClass]" to="/procesos">
          <svg
            class="w-5 h-5"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 3C6.44772 3 6 3.44772 6 4C6 4.55228 6.44772 5 7 5H13C13.5523 5 14 4.55228 14 4C14 3.44772 13.5523 3 13 3H7Z"
              fill="currentColor"
            />
            <path
              d="M4 7C4 6.44772 4.44772 6 5 6H15C15.5523 6 16 6.44772 16 7C16 7.55228 15.5523 8 15 8H5C4.44772 8 4 7.55228 4 7Z"
              fill="currentColor"
            />
            <path
              d="M2 11C2 9.89543 2.89543 9 4 9H16C17.1046 9 18 9.89543 18 11V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V11Z"
              fill="currentColor"
            />
          </svg>
          <span class="mx-4 text-sidebar-span">Procesos</span>
        </router-link>

        <!-- Submenú de Procesos -->
        <div v-if="isSubMenuOpen1" class="ml-4">
          <router-link class="block flex items-center px-6 py-2 text-white hover:bg-[#E7504D] rounded"
            :class="[$route.name === 'viajeList' ? 'bg-[#E7504D]' : '']" to="/viajeList">
            <svg class="h-5 w-5 text-stone-100" fill="none" viewBox="0 0 20 20" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17a1 1 0 01-1 1H4a1 1 0 01-1-1v-6a1 1 0 011-1h6a1 1 0 011 1v6z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7V4a2 2 0 10-4 0v3m0 0h4" />
            </svg>
            <span class="mx-4 text-sidebar-span">Viajes</span>
          </router-link>

          <router-link class="block flex items-center px-6 py-2 text-white hover:bg-[#E7504D] rounded"
            :class="[$route.name === 'encomiendaList' ? 'bg-[#E7504D]' : '']" to="/encomiendaList">
            <svg class="h-5 w-5 text-stone-100" fill="none" viewBox="0 0 20 20" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h12l3 9H0l3-9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 13v4a1 1 0 001 1h12a1 1 0 001-1v-4" />
            </svg>
            <span class="mx-4 text-sidebar-span">Encomiendas</span>
          </router-link>

          <router-link class="block flex items-center px-6 py-2 text-white hover:bg-[#E7504D] rounded"
            :class="[$route.name === 'programacionList' ? 'bg-[#E7504D]' : '']" to="/programacionList">
            <svg class="h-5 w-5 text-stone-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 2H6a2 2 0 00-2 2v6h2V4h8V2z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 10v2a2 2 0 002 2h8a2 2 0 002-2v-2H4z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M20 10v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8h16z" />
            </svg>
            <span class="mx-4 text-sidebar-span">Pasajes</span>
          </router-link>
        </div> 

        <!-- MODAL -->
        <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Modal' ? activeClass : inactiveClass]" to="/modal">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
            <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
            <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
          </svg>
          <span class="mx-4 text-sidebar-span">Reportes</span>
        </router-link>

        <!-- BLANK -->
        <!-- <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Blank' ? activeClass : inactiveClass]" to="/blank">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
            />
          </svg>
          <span class="mx-4 text-sidebar-span">Blank</span>
        </router-link> -->

      </nav>
    </div>
    
  </div>
</template>
