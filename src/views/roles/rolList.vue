<template>
  <div class="flex flex-col mt-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold">Gestión de Roles y Permisos</h2>
    </div>

    <div class="mb-4">
      <form @submit.prevent="addRole" class="flex space-x-4">
        <input
          type="text"
          v-model="newRoleName"
          placeholder="Nuevo Rol"
          class="mt-1 w-full border border-gray-300 rounded-md p-2"
          required
        />
        <button type="submit" class="px-4 py-1 text-white bg-[#e63946] hover:bg-[#d62839] rounded">Agregar Rol</button>
      </form>
    </div>

    <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">ID</th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">Rol</th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">Permisos</th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-800 uppercase bg-gray-50 border-b border-gray-200">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="role in roles" :key="role.id">
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-gray-700 text-sm">{{ role.id }}</td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-gray-700 text-sm">{{ role.name }}</td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-gray-700 text-sm">
                <span v-if="role.permissions.length === 0">Sin permisos</span>
                <span v-else>{{ role.permissions.join(', ') }}</span>
              </td>
              <td class="px-8 py-4 text-sm font-medium leading-5 text-center border-b border-gray-200 whitespace-nowrap">
                <button @click="openEditRole(role)" class="px-3 py-2 text-white bg-[#e63946] hover:bg-[#d62839] rounded"><i class="fas fa-edit"></i></button>
                <button @click="confirmDeleteRole(role.id)" class="ml-4 px-3 py-2 text-white bg-red-600 hover:bg-red-700 rounded"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal para editar rol -->
    <div v-if="isEditModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-lg font-semibold mb-4">Editar Rol: {{ editRole.name }}</h3>
        <form @submit.prevent="updateRole">
          <label for="roleName" class="block mb-2">Nombre del Rol:</label>
          <input
            id="roleName"
            type="text"
            v-model="editRole.name"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          />

          <div class="mt-4">
            <h4 class="font-semibold">Permisos:</h4>
            <div v-for="permission in permissions" :key="permission.id" class="flex items-center mt-2">
              <input
                type="checkbox"
                :value="permission.name"
                v-model="selectedPermissions"
                class="mr-2"
              />
              <label>{{ permission.name }}</label>
            </div>
          </div>

          <div class="flex justify-end mt-4">
            <button @click="isEditModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-[#e63946] text-white rounded">Actualizar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de confirmación de eliminación -->
    <div v-if="isDeleteModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-lg font-semibold mb-4">Confirmar Eliminación</h3>
        <p>¿Está seguro de que desea eliminar el rol "{{ roleToDelete.name }}"?</p>
        <div class="flex justify-end mt-4">
          <button @click="isDeleteModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
          <button @click="deleteRole(roleToDelete.id)" class="px-4 py-2 bg-red-600 text-white rounded">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface Role {
  id: number;
  name: string;
  permissions: string[];
}

interface Permission {
  id: number;
  name: string;
}

export default defineComponent({
  setup() {
    const roles = ref<Role[]>([
      { id: 1, name: "Administrador", permissions: ["Ver Encomiendas", "Crear Encomiendas"] },
      { id: 2, name: "Editor", permissions: ["Ver Encomiendas"] },
    ]);

    const permissions = ref<Permission[]>([
      { id: 1, name: "Ver Encomiendas" },
      { id: 2, name: "Crear Encomiendas" },
      { id: 3, name: "Editar Encomiendas" },
      { id: 4, name: "Eliminar Encomiendas" },
    ]);

    const newRoleName = ref<string>('');
    const editRole = ref<Role>({ id: 0, name: '', permissions: [] });
    const selectedPermissions = ref<string[]>([]);
    const isEditModalOpen = ref<boolean>(false);
    const isDeleteModalOpen = ref<boolean>(false);
    const roleToDelete = ref<Role>({ id: 0, name: '', permissions: [] }); // Para almacenar el rol a eliminar
    let nextId = 3;

    const addRole = () => {
      if (newRoleName.value.trim()) {
        roles.value.push({ id: nextId++, name: newRoleName.value, permissions: [] });
        newRoleName.value = ''; // Limpiar el campo
      }
    };

    const confirmDeleteRole = (id: number) => {
      const role = roles.value.find(role => role.id === id);
      if (role) {
        roleToDelete.value = role; // Establece el rol a eliminar
        isDeleteModalOpen.value = true; // Abre el modal de confirmación
      }
    };

    const deleteRole = (id: number) => {
      roles.value = roles.value.filter(role => role.id !== id);
      isDeleteModalOpen.value = false; // Cierra el modal después de eliminar
    };

    const openEditRole = (role: Role) => {
      editRole.value = { ...role };
      selectedPermissions.value = [...role.permissions];
      isEditModalOpen.value = true;
    };

    const updateRole = () => {
      const index = roles.value.findIndex(r => r.id === editRole.value.id);
      if (index !== -1) {
        roles.value[index] = { ...editRole.value, permissions: selectedPermissions.value };
      }
      isEditModalOpen.value = false;
    };

    return {
      roles,
      permissions,
      newRoleName,
      editRole,
      selectedPermissions,
      isEditModalOpen,
      isDeleteModalOpen,
      roleToDelete,
      addRole,
      confirmDeleteRole,
      deleteRole,
      openEditRole,
      updateRole,
    };
  },
});
</script>

<style scoped>
/* Personaliza estilos aquí */
</style>
