<template>
    <div class="flex flex-col mt-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">Gestión de Programaciones</h2>
        <button @click="openRegisterModal" class="px-4 py-2 text-white bg-[#0369a1] hover:bg-[#0369a1] rounded">
          <i class="fas fa-plus"></i> Registrar Programación
        </button>
      </div>
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Cliente
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Fecha y Hora
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Precio Total (con IGV)
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Tipo
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Destino
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Conductor
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Vehículo
                </th>
                <th class="px-8 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(programacion, index) in programaciones" :key="index">
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  {{ programacion.cliente }}
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  {{ programacion.fechaHora }}
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  {{ programacion.precioTotal }}
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  {{ programacion.tipo }}
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  {{ programacion.destino }}
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  {{ programacion.conductor }}
                </td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  {{ programacion.vehiculo }}
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
  
      <!-- Modal para registrar programación -->
      <div v-if="isRegisterModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div class="bg-white rounded-lg p-8">
          <h3 class="text-lg font-semibold mb-4">Registrar Programación</h3>
          <form @submit.prevent="registerProgramacion">
            <div class="mb-4">
              <label for="cliente" class="block text-sm font-medium text-gray-700">Cliente</label>
              <input v-model="newProgramacion.cliente" id="cliente" type="text" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200" placeholder="Ingrese el nombre del cliente" />
            </div>
            <div class="mb-4">
              <label for="fechaHora" class="block text-sm font-medium text-gray-700">Fecha y Hora</label>
              <input v-model="newProgramacion.fechaHora" id="fechaHora" type="datetime-local" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200" />
            </div>
            <div class="mb-4">
              <label for="precioTotal" class="block text-sm font-medium text-gray-700">Precio Total (con IGV)</label>
              <input v-model="newProgramacion.precioTotal" id="precioTotal" type="number" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200" placeholder="Ingrese el precio total" />
            </div>
            <div class="mb-4">
              <label for="tipo" class="block text-sm font-medium text-gray-700">Tipo</label>
              <select v-model="newProgramacion.tipo" id="tipo" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200">
                <option value="" disabled>Seleccione un tipo</option>
                <option value="Tipo 1">Tipo 1</option>
                <option value="Tipo 2">Tipo 2</option>
                <option value="Tipo 3">Tipo 3</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="destino" class="block text-sm font-medium text-gray-700">Destino</label>
              <input v-model="newProgramacion.destino" id="destino" type="text" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200" placeholder="Ingrese el destino" />
            </div>
            <div class="mb-4">
              <label for="conductor" class="block text-sm font-medium text-gray-700">Conductor</label>
              <input v-model="newProgramacion.conductor" id="conductor" type="text" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200" placeholder="Ingrese el nombre del conductor" />
            </div>
            <div class="mb-4">
              <label for="vehiculo" class="block text-sm font-medium text-gray-700">Vehículo</label>
              <input v-model="newProgramacion.vehiculo" id="vehiculo" type="text" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200" placeholder="Ingrese el vehículo" />
            </div>
            <div class="flex justify-end">
              <button type="button" @click="closeRegisterModal" class="mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded">Cancelar</button>
              <button type="submit" class="px-4 py-2 bg-[#0369a1] text-white rounded">Registrar</button>
            </div>
          </form>
        </div>
      </div>
  
      <!-- Modal para editar programación -->
      <div v-if="isEditModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div class="bg-white rounded-lg p-8">
          <h3 class="text-lg font-semibold mb-4">Editar Programación</h3>
          <form @submit.prevent="updateProgramacion">
            <div class="mb-4">
              <label for="edit-cliente" class="block text-sm font-medium text-gray-700">Cliente</label>
              <input v-model="editProgramacion.cliente" id="edit-cliente" type="text" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200" placeholder="Ingrese el nombre del cliente" />
            </div>
            <div class="mb-4">
              <label for="edit-fechaHora" class="block text-sm font-medium text-gray-700">Fecha y Hora</label>
              <input v-model="editProgramacion.fechaHora" id="edit-fechaHora" type="datetime-local" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200" />
            </div>
            <div class="mb-4">
              <label for="edit-precioTotal" class="block text-sm font-medium text-gray-700">Precio Total (con IGV)</label>
              <input v-model="editProgramacion.precioTotal" id="edit-precioTotal" type="number" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200" placeholder="Ingrese el precio total" />
            </div>
            <div class="mb-4">
              <label for="edit-tipo" class="block text-sm font-medium text-gray-700">Tipo</label>
              <select v-model="editProgramacion.tipo" id="edit-tipo" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200">
                <option value="" disabled>Seleccione un tipo</option>
                <option value="Tipo 1">Tipo 1</option>
                <option value="Tipo 2">Tipo 2</option>
                <option value="Tipo 3">Tipo 3</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="edit-destino" class="block text-sm font-medium text-gray-700">Destino</label>
              <input v-model="editProgramacion.destino" id="edit-destino" type="text" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200" placeholder="Ingrese el destino" />
            </div>
            <div class="mb-4">
              <label for="edit-conductor" class="block text-sm font-medium text-gray-700">Conductor</label>
              <input v-model="editProgramacion.conductor" id="edit-conductor" type="text" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200" placeholder="Ingrese el nombre del conductor" />
            </div>
            <div class="mb-4">
              <label for="edit-vehiculo" class="block text-sm font-medium text-gray-700">Vehículo</label>
              <input v-model="editProgramacion.vehiculo" id="edit-vehiculo" type="text" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200" placeholder="Ingrese el vehículo" />
            </div>
            <div class="flex justify-end">
              <button type="button" @click="closeEditModal" class="mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded">Cancelar</button>
              <button type="submit" class="px-4 py-2 bg-[#0369a1] text-white rounded">Actualizar</button>
            </div>
          </form>
        </div>
      </div>
  
      <!-- Modal para eliminar programación -->
      <div v-if="isDeleteModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div class="bg-white rounded-lg p-8">
          <h3 class="text-lg font-semibold mb-4">Eliminar Programación</h3>
          <p>¿Estás seguro de que deseas eliminar esta programación?</p>
          <div class="flex justify-end mt-6">
            <button type="button" @click="closeDeleteModal" class="mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded">Cancelar</button>
            <button @click="deleteProgramacion" class="px-4 py-2 bg-red-600 text-white rounded">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        programaciones: [
    {
        cliente: 'Juan Pérez',
        fechaHora: '2024-10-30T10:00:00Z',
        precioTotal: '150.00',
        tipo: 'Transporte de Clientes',
        destino: 'Trujillo',
        conductor: 'Carlos López',
        vehiculo: 'Toyota Hiace',
        observaciones: 'Recoger en la estación central'
    },
    {
        cliente: 'María Gómez',
        fechaHora: '2024-10-30T12:00:00Z',
        precioTotal: '200.00',
        tipo: 'Encomienda',
        destino: 'Lima',
        conductor: 'José Martínez',
        vehiculo: 'Furgoneta Mercedes',
        observaciones: 'Entregar en la oficina principal'
    },
    {
        cliente: 'Pedro Sánchez',
        fechaHora: '2024-10-31T09:00:00Z',
        precioTotal: '100.00',
        tipo: 'Transporte de Clientes',
        destino: 'Arequipa',
        conductor: 'Ana Torres',
        vehiculo: 'Nissan Urvan',
        observaciones: 'Recoger en el hotel'
    },
    {
        cliente: 'Laura Fernández',
        fechaHora: '2024-10-31T14:00:00Z',
        precioTotal: '180.00',
        tipo: 'Transporte de Clientes',
        destino: 'Piura',
        conductor: 'Luis Ramírez',
        vehiculo: 'Hyundai H1',
        observaciones: 'Esperar en la recepción'
    },
    {
        cliente: 'Luis Álvarez',
        fechaHora: '2024-11-01T11:00:00Z',
        precioTotal: '220.00',
        tipo: 'Encomienda',
        destino: 'Chiclayo',
        conductor: 'Fernando Reyes',
        vehiculo: 'Camión Isuzu',
        observaciones: 'Carga frágil, manejar con cuidado'
    },
    {
        cliente: 'Sofía Castillo',
        fechaHora: '2024-11-01T16:00:00Z',
        precioTotal: '250.00',
        tipo: 'Transporte de Clientes',
        destino: 'Cusco',
        conductor: 'Roberto Torres',
        vehiculo: 'Sprinter Mercedes',
        observaciones: 'Recoger en el aeropuerto'
    },
    {
        cliente: 'Ricardo Méndez',
        fechaHora: '2024-11-02T08:00:00Z',
        precioTotal: '120.00',
        tipo: 'Encomienda',
        destino: 'Huaraz',
        conductor: 'Diego Salas',
        vehiculo: 'Furgoneta Volkswagen',
        observaciones: 'Entregar antes de las 12 PM'
    },
    {
        cliente: 'Elena Vargas',
        fechaHora: '2024-11-02T13:00:00Z',
        precioTotal: '300.00',
        tipo: 'Transporte de Clientes',
        destino: 'Tacna',
        conductor: 'Gustavo León',
        vehiculo: 'Bus Marcopolo',
        observaciones: 'Viaje de larga distancia'
    }
],

        newProgramacion: {
          cliente: '',
          fechaHora: '',
          precioTotal: '',
          tipo: '',
          destino: '',
          conductor: '',
          vehiculo: ''
        },
        editProgramacion: {},
        selectedProgramacionIndex: null,
        isRegisterModalOpen: false,
        isEditModalOpen: false,
        isDeleteModalOpen: false
      };
    },
    methods: {
      openRegisterModal() {
        this.isRegisterModalOpen = true;
      },
      closeRegisterModal() {
        this.isRegisterModalOpen = false;
        this.resetNewProgramacion();
      },
      registerProgramacion() {
        this.programaciones.push({ ...this.newProgramacion });
        this.closeRegisterModal();
      },
      openEditModal(index) {
        this.selectedProgramacionIndex = index;
        this.editProgramacion = { ...this.programaciones[index] };
        this.isEditModalOpen = true;
      },
      closeEditModal() {
        this.isEditModalOpen = false;
      },
      updateProgramacion() {
        this.programaciones.splice(this.selectedProgramacionIndex, 1, this.editProgramacion);
        this.closeEditModal();
      },
      openDeleteModal(index) {
        this.selectedProgramacionIndex = index;
        this.isDeleteModalOpen = true;
      },
      closeDeleteModal() {
        this.isDeleteModalOpen = false;
      },
      deleteProgramacion() {
        this.programaciones.splice(this.selectedProgramacionIndex, 1);
        this.closeDeleteModal();
      },
      resetNewProgramacion() {
        this.newProgramacion = {
          cliente: '',
          fechaHora: '',
          precioTotal: '',
          tipo: '',
          destino: '',
          conductor: '',
          vehiculo: ''
        };
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos opcionales */
  </style>
  