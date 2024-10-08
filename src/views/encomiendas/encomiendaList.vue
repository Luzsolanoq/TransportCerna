<template>
  <div class="flex flex-col mt-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold">Gestión de Encomiendas</h2>
      <button @click="openRegisterModal" class="px-4 py-2 text-white bg-[#0369a1] hover:bg-[#034e7b] rounded">
        <i class="fas fa-plus"></i> Registrar Encomienda
      </button>
    </div>
    <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                ID Encomienda
              </th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                Descripción
              </th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                Peso
              </th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                Dimensiones
              </th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                Destinatario
              </th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                Estado
              </th>
              <th class="px-8 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(encomienda, index) in encomiendas" :key="index">
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                {{ encomienda.id }}
              </td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                {{ encomienda.descripcion }}
              </td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                {{ encomienda.peso }} kg
              </td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                {{ encomienda.dimensiones }}
              </td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                {{ encomienda.destinatario }}
              </td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                {{ encomienda.estado }}
              </td>
              <td class="px-8 py-4 text-sm font-medium leading-5 text-center border-b border-gray-200 whitespace-nowrap">
                <button @click="openEditModal(index)" class="px-3 py-2 text-white bg-[#0369a1] hover:bg-[#034e7b] rounded">
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

    <!-- Modal para registrar encomienda -->
    <div v-if="isRegisterModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-lg font-semibold mb-4">Registrar Encomienda</h3>
        <form @submit.prevent="registerEncomienda">
          <div class="mb-4">
            <label class="block text-gray-700" for="descripcion">Descripción</label>
            <input type="text" v-model="newEncomiendaData.descripcion" id="descripcion" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700" for="peso">Peso</label>
            <input type="number" v-model="newEncomiendaData.peso" id="peso" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700" for="dimensiones">Dimensiones</label>
            <input type="text" v-model="newEncomiendaData.dimensiones" id="dimensiones" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700" for="destinatario">Destinatario</label>
            <input type="text" v-model="newEncomiendaData.destinatario" id="destinatario" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700" for="estado">Estado</label>
            <select v-model="newEncomiendaData.estado" id="estado" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required>
              <option value="" disabled>Selecciona un estado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En Tránsito">En Tránsito</option>
              <option value="Entregado">Entregado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button @click="isRegisterModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-[#0369a1] text-white rounded">Registrar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal para editar encomienda -->
    <div v-if="isEditModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-lg font-semibold mb-4">Editar Encomienda</h3>
        <form @submit.prevent="updateEncomienda">
          <div class="mb-4">
            <label class="block text-gray-700" for="descripcionEdit">Descripción</label>
            <input type="text" v-model="editEncomiendaData.descripcion" id="descripcionEdit" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700" for="pesoEdit">Peso</label>
            <input type="number" v-model="editEncomiendaData.peso" id="pesoEdit" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700" for="dimensionesEdit">Dimensiones</label>
            <input type="text" v-model="editEncomiendaData.dimensiones" id="dimensionesEdit" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700" for="destinatarioEdit">Destinatario</label>
            <input type="text" v-model="editEncomiendaData.destinatario" id="destinatarioEdit" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700" for="estadoEdit">Estado</label>
            <select v-model="editEncomiendaData.estado" id="estadoEdit" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required>
              <option value="Pendiente">Pendiente</option>
              <option value="En Tránsito">En Tránsito</option>
              <option value="Entregado">Entregado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button @click="isEditModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-[#0369a1] text-white rounded">Actualizar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal para eliminar encomienda -->
    <div v-if="isDeleteModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-lg font-semibold mb-4">Eliminar Encomienda</h3>
        <p>¿Estás seguro de que deseas eliminar esta encomienda?</p>
        <div class="flex justify-end mt-4">
          <button @click="isDeleteModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
          <button @click="deleteEncomienda" class="px-4 py-2 bg-red-600 text-white rounded">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    const encomiendas = ref([]);
    const isRegisterModalOpen = ref(false);
    const isEditModalOpen = ref(false);
    const isDeleteModalOpen = ref(false);
    const newEncomiendaData = ref({
      descripcion: '',
      peso: 0,
      dimensiones: '',
      destinatario: '',
      estado: 'Pendiente', // Estado inicial por defecto
    });
    const editEncomiendaData = ref({
      id: null,
      descripcion: '',
      peso: 0,
      dimensiones: '',
      destinatario: '',
      estado: 'Pendiente',
    });
    const deleteIndex = ref(null);

    const openRegisterModal = () => {
      isRegisterModalOpen.value = true;
    };

    const registerEncomienda = () => {
      const id = encomiendas.value.length + 1; // Generar ID
      encomiendas.value.push({ id, ...newEncomiendaData.value });
      newEncomiendaData.value = { descripcion: '', peso: 0, dimensiones: '', destinatario: '', estado: 'Pendiente' };
      isRegisterModalOpen.value = false;
    };

    const openEditModal = (index) => {
      editEncomiendaData.value = { ...encomiendas.value[index] };
      isEditModalOpen.value = true;
    };

    const updateEncomienda = () => {
      const index = encomiendas.value.findIndex(e => e.id === editEncomiendaData.value.id);
      if (index !== -1) {
        encomiendas.value[index] = { ...editEncomiendaData.value };
      }
      isEditModalOpen.value = false;
    };

    const openDeleteModal = (index) => {
      deleteIndex.value = index;
      isDeleteModalOpen.value = true;
    };

    const deleteEncomienda = () => {
      encomiendas.value.splice(deleteIndex.value, 1);
      deleteIndex.value = null;
      isDeleteModalOpen.value = false;
    };

    return {
      encomiendas,
      isRegisterModalOpen,
      isEditModalOpen,
      isDeleteModalOpen,
      newEncomiendaData,
      editEncomiendaData,
      openRegisterModal,
      registerEncomienda,
      openEditModal,
      updateEncomienda,
      openDeleteModal,
      deleteEncomienda,
    };
  },
};
</script>
<style scoped>
/* Puedes personalizar más estilos aquí si es necesario */
</style>

  