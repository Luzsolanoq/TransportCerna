<template>
    <div class="flex flex-col mt-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">Gestión de Usuarios</h2>
        <button @click="openRegisterModal" class="px-4 py-2 text-white bg-[#0369a1] hover:bg-[#0369a1] rounded">
          <i class="fas fa-plus"></i> Registrar Usuario
        </button>
      </div>
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Usuario
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Correo Electrónico
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Rol Asignado
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(u, index) in users" :key="index">
                <td class="px-2 py-4 border-b border-gray-200 whitespace-nowrap">
                  <div class="flex items-center">
                    
                    <div class="ml-4">
                      <div class="text-sm leading-5 text-gray-700">
                        {{ u.name }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <div class="text-sm leading-5 text-gray-700">
                    {{ u.email }}
                  </div>
                </td>
                <td class="px-6 py-4 text-sm leading-5 text-gray-700 border-b border-gray-200 whitespace-nowrap">
                  {{ u.role }}
                </td>
                <td class="px-8 py-4 text-sm font-medium leading-5 text-center border-b border-gray-200 whitespace-nowrap">
                  <button @click="openEditModal(index)" class="px-3 py-2 text-white bg-[#0369a1] hover:bg-[#0369a1] rounded">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button @click="openDeleteModal(index)" class="ml-4 px-3 py-2 text-white bg-red-600 hover:bg-red-700 rounded">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Modal para editar usuario -->
      <div v-if="isEditModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-96">
          <h3 class="text-lg font-semibold mb-4">Editar Usuario</h3>
          <form @submit.prevent="updateUser">
            <div class="mb-4">
              <label class="block text-gray-700" for="name">Nombre</label>
              <input type="text" v-model="editUserData.name" id="name" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="email">Correo Electrónico</label>
              <input type="email" v-model="editUserData.email" id="email" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="role">Rol Asignado</label>
              <input type="text" v-model="editUserData.role" id="role" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="flex justify-end">
              <button @click="isEditModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
              <button type="submit" class="px-4 py-2 bg-[#0369a1] text-white rounded">Actualizar</button>
            </div>
          </form>
        </div>
      </div>
  
      <!-- Modal para registrar usuario -->
      <div v-if="isRegisterModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-96">
          <h3 class="text-lg font-semibold mb-4">Registrar Usuario</h3>
          <form @submit.prevent="registerUser">
            <div class="mb-4">
              <label class="block text-gray-700" for="name">Nombre</label>
              <input type="text" v-model="newUserData.name" id="name" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="email">Correo Electrónico</label>
              <input type="email" v-model="newUserData.email" id="email" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="role">Rol Asignado</label>
              <input type="text" v-model="newUserData.role" id="role" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="flex justify-end">
              <button @click="isRegisterModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
              <button type="submit" class="px-4 py-2 bg-[#0369a1] text-white rounded">Registrar</button>
            </div>
          </form>
        </div>
      </div>
  
      <!-- Modal para confirmar eliminación -->
      <div v-if="isDeleteModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-96">
          <h3 class="text-lg font-semibold mb-4">Confirmar Eliminación</h3>
          <p>¿Estás seguro de que deseas eliminar a {{ users[deleteIndex]?.name }}?</p>
          <div class="flex justify-end mt-4">
            <button @click="isDeleteModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
            <button @click="confirmDelete" class="px-4 py-2 bg-red-600 text-white rounded">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  interface User {
    name: string;
    email: string;
    role: string;
    avatar: string;
  }
  
  export default defineComponent({
    setup() {
      const users = ref<User[]>([
        {
          name: "Juan Pérez",
          email: "juan.perez@example.com",
          role: "Administrador",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg"
        },
        {
          name: "Ana González",
          email: "ana.gonzalez@example.com",
          role: "Editor",
          avatar: "https://randomuser.me/api/portraits/women/2.jpg"
        },
        // Añade más usuarios aquí
      ]);
  
      const isEditModalOpen = ref(false);
      const isRegisterModalOpen = ref(false);
      const isDeleteModalOpen = ref(false);
      const editUserData = ref<User | null>(null);
      const newUserData = ref<User>({ name: '', email: '', role: '', avatar: '' });
      const deleteIndex = ref(-1);
  
      const openEditModal = (index: number) => {
        editUserData.value = { ...users.value[index] }; // Clonar el usuario
        isEditModalOpen.value = true;
      };
  
      const openRegisterModal = () => {
        newUserData.value = { name: '', email: '', role: '', avatar: '' }; // Reiniciar datos
        isRegisterModalOpen.value = true;
      };
  
      const updateUser = () => {
        const index = users.value.findIndex(user => user.email === editUserData.value!.email);
        if (index !== -1) {
          users.value[index] = editUserData.value!;
        }
        isEditModalOpen.value = false;
      };
  
      const registerUser = () => {
        users.value.push({ ...newUserData.value, avatar: "https://randomuser.me/api/portraits/men/3.jpg" }); // Puedes cambiar el avatar según necesites
        isRegisterModalOpen.value = false;
      };
  
      const openDeleteModal = (index: number) => {
        deleteIndex.value = index;
        isDeleteModalOpen.value = true;
      };
  
      const confirmDelete = () => {
        users.value.splice(deleteIndex.value, 1);
        isDeleteModalOpen.value = false;
      };
  
      return {
        users,
        isEditModalOpen,
        isRegisterModalOpen,
        isDeleteModalOpen,
        editUserData,
        newUserData,
        deleteIndex,
        openEditModal,
        openRegisterModal,
        updateUser,
        registerUser,
        openDeleteModal,
        confirmDelete,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Agrega tus estilos aquí si es necesario */
  </style>
  