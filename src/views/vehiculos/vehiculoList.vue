<template>
  <div class="flex flex-col mt-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold">Gestión de Vehículos</h2>
      <button @click="openAddVehicleModal" class="px-4 py-2 bg-red-600 text-white rounded">Agregar Vehículo</button>
    </div>

    <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">ID</th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">Placa</th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">Tipo</th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">Capacidad de Peso</th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">Capacidad de Personas</th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-800 uppercase bg-gray-50 border-b border-gray-200">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="vehicle in vehicles" :key="vehicle.id">
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-gray-700 text-sm">{{ vehicle.id }}</td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-gray-700 text-sm">{{ vehicle.placa }}</td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-gray-700 text-sm">{{ vehicle.tipo }}</td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-gray-700 text-sm">{{ vehicle.capacidad_peso }} kg</td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-gray-700 text-sm">{{ vehicle.capacidad_personas }}</td>
              <td class="px-8 py-4 text-sm font-medium leading-5 text-center border-b border-gray-200 whitespace-nowrap">
                <button @click="openEditVehicleModal(vehicle)" class="px-3 py-2 text-white bg-red-600 hover:bg-red-700 rounded"><i class="fas fa-edit"></i></button>
                <button @click="confirmDeleteVehicle(vehicle)" class="ml-4 px-3 py-2 text-white bg-red-600 hover:bg-red-700 rounded"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal para agregar vehículo -->
    <div v-if="isAddVehicleModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-lg font-semibold mb-4">Agregar Vehículo</h3>
        <form @submit.prevent="addVehicle">
          <label for="vehiclePlaca" class="block mb-2">Placa:</label>
          <input
            id="vehiclePlaca"
            type="text"
            v-model="newVehicle.placa"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          />
          <label for="vehicleTipo" class="block mb-2 mt-4">Tipo:</label>
          <input
            id="vehicleTipo"
            type="text"
            v-model="newVehicle.tipo"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          />
          <label for="vehicleCapacidadPeso" class="block mb-2 mt-4">Capacidad de Peso (kg):</label>
          <input
            id="vehicleCapacidadPeso"
            type="number"
            v-model="newVehicle.capacidad_peso"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          />
          <label for="vehicleCapacidadPersonas" class="block mb-2 mt-4">Capacidad de Personas:</label>
          <input
            id="vehicleCapacidadPersonas"
            type="number"
            v-model="newVehicle.capacidad_personas"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          />
          <div class="flex justify-end mt-4">
            <button @click="isAddVehicleModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-red-600 text-white rounded">Agregar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal para editar vehículo -->
    <div v-if="isEditVehicleModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-lg font-semibold mb-4">Editar Vehículo: {{ editVehicle.placa }}</h3>
        <form @submit.prevent="updateVehicle">
          <label for="editVehiclePlaca" class="block mb-2">Placa:</label>
          <input
            id="editVehiclePlaca"
            type="text"
            v-model="editVehicle.placa"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          />
          <label for="editVehicleTipo" class="block mb-2 mt-4">Tipo:</label>
          <input
            id="editVehicleTipo"
            type="text"
            v-model="editVehicle.tipo"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          />
          <label for="editVehicleCapacidadPeso" class="block mb-2 mt-4">Capacidad de Peso (kg):</label>
          <input
            id="editVehicleCapacidadPeso"
            type="number"
            v-model="editVehicle.capacidad_peso"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          />
          <label for="editVehicleCapacidadPersonas" class="block mb-2 mt-4">Capacidad de Personas:</label>
          <input
            id="editVehicleCapacidadPersonas"
            type="number"
            v-model="editVehicle.capacidad_personas"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          />
          <div class="flex justify-end mt-4">
            <button @click="isEditVehicleModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-red-600 text-white rounded">Actualizar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de Confirmación de Eliminación -->
    <div v-if="isDeleteVehicleModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-lg font-semibold mb-4">Eliminar Vehículo</h3>
        <p>¿Estás seguro de que deseas eliminar el vehículo con placa {{ vehicleToDelete.placa }}?</p>
        <div class="flex justify-end mt-4">
          <button @click="isDeleteVehicleModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
          <button @click="deleteVehicle(vehicleToDelete.id)" class="px-4 py-2 bg-red-600 text-white rounded">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

interface Vehicle {
  id: number;
  placa: string;
  tipo: string;
  capacidad_peso: number;
  capacidad_personas: number;
}

export default defineComponent({
  setup() {
    const vehicles = ref<Vehicle[]>([
      { id: 1, placa: "ABC-123", tipo: "Sedán", capacidad_peso: 1500, capacidad_personas: 5 },
      { id: 2, placa: "XYZ-789", tipo: "SUV", capacidad_peso: 2000, capacidad_personas: 7 },
    ]);

    const newVehicle = ref<{ placa: string; tipo: string; capacidad_peso: number; capacidad_personas: number }>({
      placa: '',
      tipo: '',
      capacidad_peso: 0,
      capacidad_personas: 0
    });

    const editVehicle = ref<Vehicle>({ id: 0, placa: '', tipo: '', capacidad_peso: 0, capacidad_personas: 0 });
    const vehicleToDelete = ref<Vehicle>({ id: 0, placa: '', tipo: '', capacidad_peso: 0, capacidad_personas: 0 });

    const isAddVehicleModalOpen = ref<boolean>(false);
    const isEditVehicleModalOpen = ref<boolean>(false);
    const isDeleteVehicleModalOpen = ref<boolean>(false);
    
    let nextVehicleId = 3;

    const openAddVehicleModal = () => {
      newVehicle.value = { placa: '', tipo: '', capacidad_peso: 0, capacidad_personas: 0 };
      isAddVehicleModalOpen.value = true;
    };

    const addVehicle = () => {
      if (newVehicle.value.placa.trim() && newVehicle.value.tipo.trim()) {
        vehicles.value.push({
          id: nextVehicleId++,
          ...newVehicle.value,
        });
        isAddVehicleModalOpen.value = false;
      }
    };

    const openEditVehicleModal = (vehicle: Vehicle) => {
      editVehicle.value = { ...vehicle };
      isEditVehicleModalOpen.value = true;
    };

    const updateVehicle = () => {
      const index = vehicles.value.findIndex(v => v.id === editVehicle.value.id);
      if (index !== -1) {
        vehicles.value[index] = editVehicle.value;
      }
      isEditVehicleModalOpen.value = false;
    };

    const confirmDeleteVehicle = (vehicle: Vehicle) => {
      vehicleToDelete.value = vehicle;
      isDeleteVehicleModalOpen.value = true;
    };

    const deleteVehicle = (id: number) => {
      vehicles.value = vehicles.value.filter(vehicle => vehicle.id !== id);
      isDeleteVehicleModalOpen.value = false;
    };

    return {
      vehicles,
      newVehicle,
      editVehicle,
      vehicleToDelete,
      isAddVehicleModalOpen,
      isEditVehicleModalOpen,
      isDeleteVehicleModalOpen,
      openAddVehicleModal,
      addVehicle,
      openEditVehicleModal,
      updateVehicle,
      confirmDeleteVehicle,
      deleteVehicle,
    };
  },
});
</script>

<style scoped>
/* Personaliza estilos aquí */
</style>
