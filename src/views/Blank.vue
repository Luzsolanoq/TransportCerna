<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-[#BC0000]  p-8 rounded-lg shadow-md w-96">
      <div class="flex justify-center mb-6">
        <img src="/logo01.jpg" alt="Logo" class="h-30 w-36 mx-2" /> <!-- Añadir imagen -->
      </div>
      <!-- <h2 class="text-2xl font-semibold text-center mb-4">Iniciar Sesión</h2> -->
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-sm font-medium text-white">Correo Electrónico</label>
          <input
            type="email"
            v-model="email"
            placeholder="Ingresa tu correo"
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
      <div class="mt-4 text-center">
        <router-link to="/forgot-password" class="text-sm text-white hover:underline">¿Olvidaste tu contraseña?</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const email = ref('');
    const password = ref('');

    const handleLogin = () => {
      // Aquí puedes agregar tu lógica de inicio de sesión
      console.log(`Email: ${email.value}, Password: ${password.value}`);
    };

    return {
      email,
      password,
      handleLogin,
    };
  },
});
</script>

<style scoped>
/* Estilos adicionales, si es necesario */
</style>
