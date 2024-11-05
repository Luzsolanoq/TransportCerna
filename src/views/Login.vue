<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const dni = ref('74908393')
const password = ref('@#!@#asdf1231!_!@#')

function login() {
  router.push('/dashboard')
}
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-[#BC0000] p-8 rounded-lg shadow-md w-96">
      <div class="flex justify-center mb-6">
        <img src="/logo01.jpg" alt="Logo" class="h-30 w-36 mx-2" />
      </div>
      <form class="mt-4" @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-sm font-medium text-white">DNI</label>
          <input
            type="text"
            v-model="dni"
            placeholder="Ingresa tu DNI"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-white">Contraseña</label>
          <input
            type="password"
            v-model="password"
            placeholder="Ingresa tu contraseña"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 text-black bg-gray-300 hover:bg-gray-300 rounded"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  </div>
</template>

