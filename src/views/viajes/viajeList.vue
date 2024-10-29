<template>
  <div class="flex flex-col mt-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold">Gestión de Viajes</h2>
      <button @click="openRegisterModal" class="px-4 py-2 text-white bg-[#0369a1] hover:bg-[#0369a1] rounded">
        <i class="fas fa-plus"></i> Lista de Programación de Viaje
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
                ID Chofer
              </th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                Hora
              </th>
              <th class="px-6 py-3 text-xs font-medium leading-5 text-center text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(viaje, index) in viajes" :key="index">
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                {{ viaje.idViaje }}
              </td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                {{ viaje.idChofer }} 
              </td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                {{ viaje.hora }}
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
              <label class="block text-gray-700" for="idViaje">ID Viaje</label>
              <input type="text" v-model="editViajeData.idViaje" id="idViaje" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
          <div class="mb-4">
            <label class="block text-gray-700" for="vehiculo">Seleccione Vehiculo</label>
            <select v-model="newViajeData.idVehiculo" id="vehiculo" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required>
              <option disabled value="">Seleccione un vehiculo</option>
              <option v-for="vehiculo in vehiculos" :key="vehiculo.idVehiculo" :value="vehiculo.idVehiculo">
                {{ vehiculo.placa }} - {{ vehiculo.marca }} {{ vehiculo.modelo }} 
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700" for="chofer">Seleccione Chofer</label>
            <select v-model="newViajeData.idChofer" id="chofer" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required>
              <option disabled value="">Seleccione un chofer</option>
              <option v-for="chofer in choferes" :key="chofer.id" :value="chofer.id">
                {{ chofer.nombre }} {{ chofer.apellidos }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700" for="hora">Hora</label>
            <input type="datetime-local" v-model="newViajeData.hora" id="hora" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
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
            <label class="block text-gray-700" for="idVehiculoEdit">ID Viaje</label>
            <input type="text" v-model="editViajeData.idViaje" id="idViajeEdit" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700" for="idChoferEdit">ID Chofer</label>
            <input type="text" v-model="editViajeData.idChofer" id="idChoferEdit" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700" for="horaEdit">Hora</label>
            <input type="datetime-local" v-model="editViajeData.hora" id="horaEdit" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
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

<script>
export default {
  data() {
    return {
      viajes: [
      {
    idViaje: '1',
    idChofer: '1',
    idVehiculo: '1',
    hora: '2024-10-30T08:00'
  },
  {
    idViaje: '2',
    idChofer: '2',
    idVehiculo: '3',
    hora: '2024-10-30T09:30'
  },
  {
    idViaje: '3',
    idChofer: '3',
    idVehiculo: '2',
    hora: '2024-10-30T11:00'
  },
  {
    idViaje: '4',
    idChofer: '4',
    idVehiculo: '4',
    hora: '2024-10-30T12:30'
  },
  {
    idViaje: '5',
    idChofer: '5',
    idVehiculo: '5',
    hora: '2024-10-30T14:00'
  }
      ], // Lista de viajes
      vehiculos: [
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
        // Agregar más vehículos aquí...
      ],
      choferes: [
      { id: 1, nombre: 'Juan', apellidos: 'Pérez', dni: '12345678', licencia: 'AB12345', correo: 'juan.perez@example.com' },
      { id: 2, nombre: 'Ana', apellidos: 'García', dni: '87654321', licencia: 'BC54321', correo: 'ana.garcia@example.com' },
      { id: 3, nombre: 'Luis', apellidos: 'Martínez', dni: '11223344', licencia: 'CD98765', correo: 'luis.martinez@example.com' },
      { id: 4, nombre: 'Carlos', apellidos: 'Rodríguez', dni: '23456789', licencia: 'DE67890', correo: 'carlos.rodriguez@example.com' },
      { id: 5, nombre: 'María', apellidos: 'López', dni: '34567890', licencia: 'EF78901', correo: 'maria.lopez@example.com' },
      { id: 6, nombre: 'Jorge', apellidos: 'Fernández', dni: '45678901', licencia: 'GH89012', correo: 'jorge.fernandez@example.com' },
      { id: 7, nombre: 'Sofía', apellidos: 'Martínez', dni: '56789012', licencia: 'HI90123', correo: 'sofia.martinez@example.com' },
      { id: 8, nombre: 'Diego', apellidos: 'Torres', dni: '67890123', licencia: 'IJ01234', correo: 'diego.torres@example.com' }
        // Agregar más choferes aquí...
      ],
      isRegisterModalOpen: false,
      isEditModalOpen: false,
      isDeleteModalOpen: false,
      newViajeData: {
        idVehiculo: '',
        idChofer: '',
        hora: ''
      },
      editViajeData: {
        idVehiculo: '',
        idChofer: '',
        hora: ''
      },
      viajeIndexToEdit: null,
      viajeIndexToDelete: null
    };
  },
  methods: {
    openRegisterModal() {
      this.isRegisterModalOpen = true;
    },
    registerViaje() {
      this.viajes.push({ ...this.newViajeData });
      this.newViajeData = { idVehiculo: '', idChofer: '', hora: '' };
      this.isRegisterModalOpen = false;
    },
    openEditModal(index) {
      this.viajeIndexToEdit = index;
      this.editViajeData = { ...this.viajes[index] };
      this.isEditModalOpen = true;
    },
    updateViaje() {
      this.$set(this.viajes, this.viajeIndexToEdit, { ...this.editViajeData });
      this.isEditModalOpen = false;
    },
    openDeleteModal(index) {
      this.viajeIndexToDelete = index;
      this.isDeleteModalOpen = true;
    },
    deleteViaje() {
      this.viajes.splice(this.viajeIndexToDelete, 1);
      this.isDeleteModalOpen = false;
    }
  }
};
</script>

<style scoped>
/* Agregar estilos si es necesario */
</style>
