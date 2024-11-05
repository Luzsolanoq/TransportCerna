<template>
  <div class="flex flex-col mt-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold">Gestión de Usuarios</h2>
      <button @click="openAddUserModal" class="px-4 py-1 text-white bg-[#e63946] hover:bg-[#d62839] rounded">Agregar Usuario</button>
    </div>

    <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">ID</th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">Nombre</th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">DNI</th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">Celular</th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">Rol</th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-800 uppercase bg-gray-50 border-b border-gray-200">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id">
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-gray-700 text-sm">{{ user.id }}</td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-gray-700 text-sm">{{ user.nombre }}</td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-gray-700 text-sm">{{ user.dni }}</td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-gray-700 text-sm">{{ user.celular }}</td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-gray-700 text-sm">{{ user.rol.nombre }}</td>
              <td class="px-8 py-4 text-sm font-medium leading-5 text-center border-b border-gray-200 whitespace-nowrap">
                <button @click="openEditUserModal(user)" class="px-3 py-2 text-white bg-[#e63946] hover:bg-[#d62839] rounded"><i class="fas fa-edit"></i></button>
                <button @click="confirmDeleteUser(user)" class="ml-4 px-3 py-2 text-white bg-red-600 hover:bg-red-700 rounded"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal para agregar usuario -->
    <div v-if="isAddUserModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-lg font-semibold mb-4">Agregar Usuario</h3>
        <form @submit.prevent="addUser">
          <label for="userNombre" class="block mb-2">Nombre:</label>
          <input
            id="userNombre"
            type="text"
            v-model="newUser.nombre"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          />
          <label for="userDni" class="block mb-2 mt-4">DNI:</label>
          <input
            id="userDni"
            type="text"
            v-model="newUser.dni"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          />
          <label for="userCelular" class="block mb-2 mt-4">Celular:</label>
          <input
            id="userCelular"
            type="text"
            v-model="newUser.celular"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
          />
          <label for="userRol" class="block mb-2 mt-4">Rol:</label>
          <select
            id="userRol"
            v-model="newUser.id_rol"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.nombre }}</option>
          </select>
          <label for="userContraseña" class="block mb-2 mt-4">Contraseña:</label>
          <div class="relative">
            <input
              id="userContraseña"
              :type="showPassword ? 'text' : 'password'"
              v-model="newUser.contraseña"
              class="mt-1 w-full border border-gray-300 rounded-md p-2"
              required
            />
            <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 flex items-center pr-2">
              <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
            </button>
          </div>
          <div class="flex justify-end mt-4">
            <button @click="isAddUserModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-[#e63946] text-white rounded">Agregar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal para editar usuario -->
    <div v-if="isEditUserModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-lg font-semibold mb-4">Editar Usuario: {{ editUser.nombre }}</h3>
        <form @submit.prevent="updateUser">
          <label for="editUserNombre" class="block mb-2">Nombre:</label>
          <input
            id="editUserNombre"
            type="text"
            v-model="editUser.nombre"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          />
          <label for="editUserDni" class="block mb-2 mt-4">DNI:</label>
          <input
            id="editUserDni"
            type="text"
            v-model="editUser.dni"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          />
          <label for="editUserCelular" class="block mb-2 mt-4">Celular:</label>
          <input
            id="editUserCelular"
            type="text"
            v-model="editUser.celular"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
          />
          <label for="editUserRol" class="block mb-2 mt-4">Rol:</label>
          <select
            id="editUserRol"
            v-model="editUser.id_rol"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.nombre }}</option>
          </select>
          <label for="editUserContraseña" class="block mb-2 mt-4">Contraseña:</label>
          <div class="relative">
            <input
              id="editUserContraseña"
              :type="showEditPassword ? 'text' : 'password'"
              v-model="editUser.contraseña"
              class="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
            <button type="button" @click="toggleEditPasswordVisibility" class="absolute inset-y-0 right-0 flex items-center pr-2">
              <i :class="showEditPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
            </button>
          </div>
          <div class="flex justify-end mt-4">
            <button @click="isEditUserModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-[#e63946] text-white rounded">Actualizar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de Confirmación de Eliminación -->
    <div v-if="isDeleteUserModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-lg font-semibold mb-4">Eliminar Usuario</h3>
        <p>¿Estás seguro de que deseas eliminar al usuario {{ userToDelete.nombre }}?</p>
        <div class="flex justify-end mt-4">
          <button @click="isDeleteUserModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
          <button @click="deleteUser(userToDelete.id)" class="px-4 py-2 bg-red-600 text-white rounded">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

interface User {
  id: number;
  nombre: string;
  dni: string;
  celular: string;
  id_rol: number;
  rol: { id: number; nombre: string };
  contraseña: string;
}

interface Role {
  id: number;
  nombre: string;
}

export default defineComponent({
  setup() {
    const users = ref<User[]>([
      { id: 1, nombre: "Juan Pérez", dni: "12345678", celular: "987654321", id_rol: 1, rol: { id: 1, nombre: "Administrador" }, contraseña: "password123" },
      { id: 2, nombre: "Ana Gómez", dni: "87654321", celular: "123456789", id_rol: 2, rol: { id: 2, nombre: "Editor" }, contraseña: "password456" },
    ]);

    const roles = ref<Role[]>([
      { id: 1, nombre: "Administrador" },
      { id: 2, nombre: "Editor" },
    ]);

    const newUser = ref<{ nombre: string; dni: string; celular: string; id_rol: number; contraseña: string }>({ nombre: '', dni: '', celular: '', id_rol: 1, contraseña: '' });
    const editUser = ref<User>({ id: 0, nombre: '', dni: '', celular: '', id_rol: 1, rol: { id: 1, nombre: '' }, contraseña: '' });
    const userToDelete = ref<User>({ id: 0, nombre: '', dni: '', celular: '', id_rol: 1, rol: { id: 1, nombre: '' }, contraseña: '' });

    const isAddUserModalOpen = ref<boolean>(false);
    const isEditUserModalOpen = ref<boolean>(false);
    const isDeleteUserModalOpen = ref<boolean>(false);
    
    const showPassword = ref<boolean>(false);
    const showEditPassword = ref<boolean>(false);

    let nextUserId = 3;

    const openAddUserModal = () => {
      newUser.value = { nombre: '', dni: '', celular: '', id_rol: 1, contraseña: '' };
      isAddUserModalOpen.value = true;
    };

    const addUser = () => {
      if (newUser.value.nombre.trim() && newUser.value.dni.trim()) {
        users.value.push({
          id: nextUserId++,
          ...newUser.value,
          rol: roles.value.find(role => role.id === newUser.value.id_rol)!,
        });
        isAddUserModalOpen.value = false;
      }
    };

    const openEditUserModal = (user: User) => {
      editUser.value = { ...user };
      isEditUserModalOpen.value = true;
    };

    const updateUser = () => {
      const index = users.value.findIndex(u => u.id === editUser.value.id);
      if (index !== -1) {
        users.value[index] = { ...editUser.value, rol: roles.value.find(role => role.id === editUser.value.id_rol)! };
      }
      isEditUserModalOpen.value = false;
    };

    const confirmDeleteUser = (user: User) => {
      userToDelete.value = user;
      isDeleteUserModalOpen.value = true;
    };

    const deleteUser = (id: number) => {
      users.value = users.value.filter(user => user.id !== id);
      isDeleteUserModalOpen.value = false;
    };

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const toggleEditPasswordVisibility = () => {
      showEditPassword.value = !showEditPassword.value;
    };

    return {
      users,
      roles,
      newUser,
      editUser,
      userToDelete,
      isAddUserModalOpen,
      isEditUserModalOpen,
      isDeleteUserModalOpen,
      showPassword,
      showEditPassword,
      openAddUserModal,
      addUser,
      openEditUserModal,
      updateUser,
      confirmDeleteUser,
      deleteUser,
      togglePasswordVisibility,
      toggleEditPasswordVisibility,
    };
  },
});
</script>

<style scoped>
/* Personaliza estilos aquí */
</style>
