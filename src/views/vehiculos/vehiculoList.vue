<template>
    <div class="flex flex-col mt-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">Listado de Vehículos</h2>
        <button @click="openRegisterModal" class="px-4 py-2 text-white bg-[#0369a1] hover:bg-[#0369a1] rounded">
          <i class="fas fa-plus"></i> Registrar Vehículo
        </button>
      </div>
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  ID Vehículo
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Placa
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Marca
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Modelo
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Capacidad
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Tipo
                </th>
                <th class="px-8 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(v, index) in vehicles" :key="index">
                <td class="px-12 py-4 border-b border-gray-200 whitespace-nowrap">{{ v.idVehiculo }}</td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">{{ v.placa }}</td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">{{ v.marca }}</td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">{{ v.modelo }}</td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">{{ v.capacidad }}</td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">{{ v.tipo }}</td>
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
  
      <!-- Modal para editar vehículo -->
      <div v-if="isEditModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-96">
          <h3 class="text-lg font-semibold mb-4">Editar Vehículo</h3>
          <form @submit.prevent="updateVehicle">
            <div class="mb-4">
              <label class="block text-gray-700" for="idVehiculo">ID Vehículo</label>
              <input type="text" v-model="editVehicleData.idVehiculo" id="idVehiculo" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="placa">Placa</label>
              <input type="text" v-model="editVehicleData.placa" id="placa" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="marca">Marca</label>
              <input type="text" v-model="editVehicleData.marca" id="marca" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="modelo">Modelo</label>
              <input type="text" v-model="editVehicleData.modelo" id="modelo" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="capacidad">Capacidad</label>
              <input type="text" v-model="editVehicleData.capacidad" id="capacidad" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="tipo">Tipo</label>
              <input type="text" v-model="editVehicleData.tipo" id="tipo" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="flex justify-end">
              <button @click="isEditModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
              <button type="submit" class="px-4 py-2 bg-[#0369a1] text-white rounded">Actualizar</button>
            </div>
          </form>
        </div>
      </div>
  
      <!-- Modal para registrar vehículo -->
      <div v-if="isRegisterModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-96">
          <h3 class="text-lg font-semibold mb-4">Registrar Vehículo</h3>
          <form @submit.prevent="registerVehicle">
            <div class="mb-4">
              <label class="block text-gray-700" for="idVehiculo">ID Vehículo</label>
              <input type="text" v-model="newVehicleData.idVehiculo" id="idVehiculo" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="placa">Placa</label>
              <input type="text" v-model="newVehicleData.placa" id="placa" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="marca">Marca</label>
              <input type="text" v-model="newVehicleData.marca" id="marca" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="modelo">Modelo</label>
              <input type="text" v-model="newVehicleData.modelo" id="modelo" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="capacidad">Capacidad</label>
              <input type="text" v-model="newVehicleData.capacidad" id="capacidad" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="tipo">Tipo</label>
              <input type="text" v-model="newVehicleData.tipo" id="tipo" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="flex justify-end">
              <button @click="isRegisterModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
              <button type="submit" class="px-4 py-2 bg-[#0369a1] text-white rounded">Registrar</button>
            </div>
          </form>
        </div>
      </div>
  
      <!-- Modal para eliminar vehículo -->
      <div v-if="isDeleteModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-96">
          <h3 class="text-lg font-semibold mb-4">Eliminar Vehículo</h3>
          <p>¿Estás seguro de que deseas eliminar el vehículo {{ vehicles[deleteIndex]?.placa }}?</p>
          <div class="flex justify-end mt-4">
            <button @click="isDeleteModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
            <button @click="deleteVehicle" class="px-4 py-2 bg-red-600 text-white rounded">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        vehicles: [
        {
    idVehiculo: '1',
    placa: 'ABC123',
    marca: 'Toyota',
    modelo: 'Hilux',
    capacidad: '5',
    tipo: 'Camión'
  },
  {
    idVehiculo: '2',
    placa: 'XYZ456',
    marca: 'Mercedes-Benz',
    modelo: 'Sprinter',
    capacidad: '15',
    tipo: 'Furgoneta'
  },
  {
    idVehiculo: '3',
    placa: 'LMN789',
    marca: 'Ford',
    modelo: 'Ranger',
    capacidad: '5',
    tipo: 'Camión'
  },
  {
    idVehiculo: '4',
    placa: 'QRS234',
    marca: 'Nissan',
    modelo: 'NV350',
    capacidad: '12',
    tipo: 'Furgoneta'
  },
  {
    idVehiculo: '5',
    placa: 'TUV567',
    marca: 'Chevrolet',
    modelo: 'Express',
    capacidad: '10',
    tipo: 'Furgoneta'
  },
  {
    idVehiculo: '6',
    placa: 'WXY890',
    marca: 'Mitsubishi',
    modelo: 'L200',
    capacidad: '5',
    tipo: 'Camión'
  },
  {
    idVehiculo: '7',
    placa: 'JKL345',
    marca: 'Isuzu',
    modelo: 'D-Max',
    capacidad: '5',
    tipo: 'Camión'
  },
  {
    idVehiculo: '8',
    placa: 'EFG678',
    marca: 'Renault',
    modelo: 'Master',
    capacidad: '15',
    tipo: 'Furgoneta'
  },
        ],
        newVehicleData: {
          idVehiculo: '',
          placa: '',
          marca: '',
          modelo: '',
          capacidad: '',
          tipo: ''
        },
        editVehicleData: {
          idVehiculo: '',
          placa: '',
          marca: '',
          modelo: '',
          capacidad: '',
          tipo: ''
        },
        isEditModalOpen: false,
        isRegisterModalOpen: false,
        isDeleteModalOpen: false,
        deleteIndex: null
      };
    },
    methods: {
      openRegisterModal() {
        this.newVehicleData = {
          idVehiculo: '',
          placa: '',
          marca: '',
          modelo: '',
          capacidad: '',
          tipo: ''
        };
        this.isRegisterModalOpen = true;
      },
      registerVehicle() {
        this.vehicles.push({ ...this.newVehicleData });
        this.isRegisterModalOpen = false;
      },
      openEditModal(index) {
        this.editVehicleData = { ...this.vehicles[index] };
        this.isEditModalOpen = true;
      },
      updateVehicle() {
        const index = this.vehicles.findIndex(v => v.idVehiculo === this.editVehicleData.idVehiculo);
        if (index !== -1) {
          this.vehicles.splice(index, 1, { ...this.editVehicleData });
        }
        this.isEditModalOpen = false;
      },
      openDeleteModal(index) {
        this.deleteIndex = index;
        this.isDeleteModalOpen = true;
      },
      deleteVehicle() {
        this.vehicles.splice(this.deleteIndex, 1);
        this.isDeleteModalOpen = false;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos opcionales */
  </style>
  