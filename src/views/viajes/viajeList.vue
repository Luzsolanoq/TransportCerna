<template>
    <div class="flex flex-col mt-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">Gestión de Viajes</h2>
        <button @click="openRegisterModal" class="px-4 py-2 text-white bg-[#0369a1] hover:bg-[#0369a1] rounded">
          <i class="fas fa-plus"></i> Registrar Viaje
        </button>
      </div>
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  ID Viaje
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Tipo Viaje
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  ID Vehículo
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  ID Chofer
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Fecha Salida
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Fecha Llegada
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(viaje, index) in viajes" :key="index">
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  {{ viaje.id }}
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  {{ viaje.tipoViaje }}
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  {{ viaje.idVehiculo }}
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  {{ viaje.idChofer }}
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  {{ viaje.fechaSalida }}
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  {{ viaje.fechaLlegada }}
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
  
      <!-- Modal para registrar viaje -->
      <div v-if="isRegisterModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-96">
          <h3 class="text-lg font-semibold mb-4">Registrar Viaje</h3>
          <form @submit.prevent="registerViaje">
            <div class="mb-4">
              <label class="block text-gray-700" for="tipoViaje">Tipo Viaje</label>
              <select v-model="newViajeData.tipoViaje" id="tipoViaje" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required>
                <option value="Sierra">Sierra</option>
                <option value="Encomienda">Encomienda</option>
                <option value="Transporte de Clientes">Transporte de Clientes</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="idVehiculo">ID Vehículo</label>
              <input type="text" v-model="newViajeData.idVehiculo" id="idVehiculo" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="idChofer">ID Chofer</label>
              <input type="text" v-model="newViajeData.idChofer" id="idChofer" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="fechaSalida">Fecha Salida</label>
              <input type="date" v-model="newViajeData.fechaSalida" id="fechaSalida" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="fechaLlegada">Fecha Llegada</label>
              <input type="date" v-model="newViajeData.fechaLlegada" id="fechaLlegada" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="flex justify-end">
              <button @click="isRegisterModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
              <button type="submit" class="px-4 py-2 bg-[#0369a1] text-white rounded">Registrar</button>
            </div>
          </form>
        </div>
      </div>
  
      <!-- Modal para editar viaje -->
      <div v-if="isEditModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-96">
          <h3 class="text-lg font-semibold mb-4">Editar Viaje</h3>
          <form @submit.prevent="updateViaje">
            <div class="mb-4">
              <label class="block text-gray-700" for="tipoViajeEdit">Tipo Viaje</label>
              <select v-model="editViajeData.tipoViaje" id="tipoViajeEdit" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required>
                <option value="Sierra">Sierra</option>
                <option value="Encomienda">Encomienda</option>
                <option value="Transporte de Clientes">Transporte de Clientes</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="idVehiculoEdit">ID Vehículo</label>
              <input type="text" v-model="editViajeData.idVehiculo" id="idVehiculoEdit" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="idChoferEdit">ID Chofer</label>
              <input type="text" v-model="editViajeData.idChofer" id="idChoferEdit" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="fechaSalidaEdit">Fecha Salida</label>
              <input type="date" v-model="editViajeData.fechaSalida" id="fechaSalidaEdit" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="fechaLlegadaEdit">Fecha Llegada</label>
              <input type="date" v-model="editViajeData.fechaLlegada" id="fechaLlegadaEdit" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="flex justify-end">
              <button @click="isEditModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
              <button type="submit" class="px-4 py-2 bg-[#0369a1] text-white rounded">Actualizar</button>
            </div>
          </form>
        </div>
      </div>
  
      <!-- Modal para confirmar eliminación -->
      <div v-if="isDeleteModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-96">
          <h3 class="text-lg font-semibold mb-4">Eliminar Viaje</h3>
          <p>¿Estás seguro de que deseas eliminar este viaje?</p>
          <div class="flex justify-end mt-4">
            <button @click="isDeleteModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
            <button @click="deleteViaje" class="px-4 py-2 bg-red-600 text-white rounded">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue';
  
  export default {
    setup() {
      const viajes = ref<any[]>([]);
      const isRegisterModalOpen = ref(false);
      const isEditModalOpen = ref(false);
      const isDeleteModalOpen = ref(false);
      const newViajeData = ref({
        tipoViaje: '',
        idVehiculo: '',
        idChofer: '',
        fechaSalida: '',
        fechaLlegada: ''
      });
      const editViajeData = ref<any>({});
      const viajeToDeleteIndex = ref<number | null>(null);
  
      const openRegisterModal = () => {
        newViajeData.value = { tipoViaje: '', idVehiculo: '', idChofer: '', fechaSalida: '', fechaLlegada: '' };
        isRegisterModalOpen.value = true;
      };
  
      const registerViaje = () => {
        const newViaje = { id: viajes.value.length + 1, ...newViajeData.value };
        viajes.value.push(newViaje);
        isRegisterModalOpen.value = false;
      };
  
      const openEditModal = (index: number) => {
        editViajeData.value = { ...viajes.value[index] };
        isEditModalOpen.value = true;
      };
  
      const updateViaje = () => {
        const index = viajes.value.findIndex(v => v.id === editViajeData.value.id);
        if (index !== -1) {
          viajes.value[index] = { ...editViajeData.value };
        }
        isEditModalOpen.value = false;
      };
  
      const openDeleteModal = (index: number) => {
        viajeToDeleteIndex.value = index;
        isDeleteModalOpen.value = true;
      };
  
      const deleteViaje = () => {
        if (viajeToDeleteIndex.value !== null) {
          viajes.value.splice(viajeToDeleteIndex.value, 1);
        }
        isDeleteModalOpen.value = false;
      };
  
      return {
        viajes,
        isRegisterModalOpen,
        isEditModalOpen,
        isDeleteModalOpen,
        newViajeData,
        editViajeData,
        openRegisterModal,
        registerViaje,
        openEditModal,
        updateViaje,
        openDeleteModal,
        deleteViaje
      };
    }
  };
  </script>
  
  <style scoped>
  /* Puedes añadir estilos específicos aquí */
  </style>
  