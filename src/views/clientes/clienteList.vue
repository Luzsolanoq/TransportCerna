<template>
    <div class="flex flex-col mt-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">Listado de Clientes</h2>
        <button @click="openRegisterModal" class="px-4 py-2 text-white bg-[#0369a1] hover:bg-[#0369a1] rounded">
          <i class="fas fa-plus"></i> Agregar Cliente
        </button>
      </div>
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  ID
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Nombre
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Apellidos
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  DNI
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Dirección
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Celular
                </th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(cliente, index) in clientes" :key="index">
                <td class="px-6 py-4 border-b border-gray-200">{{ cliente.id }}</td>
                <td class="px-6 py-4 border-b border-gray-200">{{ cliente.nombre }}</td>
                <td class="px-6 py-4 border-b border-gray-200">{{ cliente.apellidos }}</td>
                <td class="px-6 py-4 border-b border-gray-200">{{ cliente.dni }}</td>
                <td class="px-6 py-4 border-b border-gray-200">{{ cliente.direccion }}</td>
                <td class="px-6 py-4 border-b border-gray-200">{{ cliente.celular }}</td>
                <td class="px-8 py-4 text-sm font-medium leading-5 text-center border-b border-gray-200">
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
  
      <!-- Modal para editar cliente -->
      <div v-if="isEditModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-96">
          <h3 class="text-lg font-semibold mb-4">Editar Cliente</h3>
          <form @submit.prevent="updateCliente">
            <div class="mb-4">
              <label class="block text-gray-700" for="nombre">Nombre</label>
              <input type="text" v-model="editClienteData.nombre" id="nombre" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="apellidos">Apellidos</label>
              <input type="text" v-model="editClienteData.apellidos" id="apellidos" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="dni">DNI</label>
              <input type="text" v-model="editClienteData.dni" id="dni" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="direccion">Dirección</label>
              <input type="text" v-model="editClienteData.direccion" id="direccion" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="celular">Celular</label>
              <input type="text" v-model="editClienteData.celular" id="celular" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
           
            <div class="flex justify-end">
              <button @click="isEditModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
              <button type="submit" class="px-4 py-2 bg-[#0369a1] text-white rounded">Actualizar</button>
            </div>
          </form>
        </div>
      </div>
  
      <!-- Modal para registrar cliente -->
      <div v-if="isRegisterModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-96">
          <h3 class="text-lg font-semibold mb-4">Registrar Cliente</h3>
          <form @submit.prevent="registerCliente">
            <div class="mb-4">
              <label class="block text-gray-700" for="nombre">Nombre</label>
              <input type="text" v-model="newClienteData.nombre" id="nombre" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="apellidos">Apellidos</label>
              <input type="text" v-model="newClienteData.apellidos" id="apellidos" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="dni">DNI</label>
              <input type="text" v-model="newClienteData.dni" id="dni" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="direccion">Dirección</label>
              <input type="text" v-model="newClienteData.direccion" id="direccion" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700" for="celular">Celular</label>
              <input type="text" v-model="newClienteData.celular" id="celular" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            
            <div class="flex justify-end">
              <button @click="isRegisterModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
              <button type="submit" class="px-4 py-2 bg-[#0369a1] text-white rounded">Registrar</button>
            </div>
          </form>
        </div>
      </div>
  
      <!-- Modal para eliminar cliente -->
      <div v-if="isDeleteModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-96">
          <h3 class="text-lg font-semibold mb-4">Eliminar Cliente</h3>
          <p>¿Estás seguro que deseas eliminar este cliente?</p>
          <div class="flex justify-end mt-4">
            <button @click="isDeleteModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
            <button @click="deleteCliente" class="px-4 py-2 bg-red-600 text-white rounded">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        clientes: [
        { id: 1, nombre: 'Juan', apellidos: 'Perez', dni: '12345678', direccion: 'Calle 123', celular: '987654321' },
        { id: 2, nombre: 'Maria', apellidos: 'Lopez', dni: '87654321', direccion: 'Avenida 456', celular: '912345678' },
        { id: 3, nombre: 'Carlos', apellidos: 'Gonzalez', dni: '23456789', direccion: 'Boulevard 789', celular: '945678123' },
        { id: 4, nombre: 'Ana', apellidos: 'Fernandez', dni: '34567890', direccion: 'Calle Falsa 101', celular: '987123456' },
        { id: 5, nombre: 'Luis', apellidos: 'Martinez', dni: '45678901', direccion: 'Pasaje 202', celular: '963258741' },
        { id: 6, nombre: 'Sofia', apellidos: 'Ramirez', dni: '56789012', direccion: 'Plaza Central 303', celular: '874512369' },
        { id: 7, nombre: 'Jorge', apellidos: 'Hernandez', dni: '67890123', direccion: 'Calle 404', celular: '756789012' },
        { id: 8, nombre: 'Laura', apellidos: 'Castillo', dni: '78901234', direccion: 'Avenida del Sol 505', celular: '654321987' },
        { id: 9, nombre: 'Pedro', apellidos: 'Morales', dni: '89012345', direccion: 'Calle de la Paz 606', celular: '543210123' },
        { id: 10, nombre: 'Clara', apellidos: 'Diaz', dni: '90123456', direccion: 'Calle Larga 707', celular: '321654987' }
        ],
        newClienteData: {
          nombre: '',
          apellidos: '',
          dni: '',
          direccion: '',
          celular: '',
          correo: '',
        },
        editClienteData: {},
        isRegisterModalOpen: false,
        isEditModalOpen: false,
        isDeleteModalOpen: false,
        clienteIndexToDelete: null,
      };
    },
    methods: {
      openRegisterModal() {
        this.isRegisterModalOpen = true;
      },
      registerCliente() {
        const newId = this.clientes.length + 1;
        this.clientes.push({ id: newId, ...this.newClienteData });
        this.isRegisterModalOpen = false;
        this.resetNewClienteData();
      },
      resetNewClienteData() {
        this.newClienteData = {
          nombre: '',
          apellidos: '',
          dni: '',
          direccion: '',
          celular: '',
          correo: '',
        };
      },
      openEditModal(index) {
        this.editClienteData = { ...this.clientes[index] };
        this.isEditModalOpen = true;
      },
      updateCliente() {
        const index = this.clientes.findIndex(cliente => cliente.id === this.editClienteData.id);
        if (index !== -1) {
          this.clientes[index] = { ...this.editClienteData };
        }
        this.isEditModalOpen = false;
      },
      openDeleteModal(index) {
        this.clienteIndexToDelete = index;
        this.isDeleteModalOpen = true;
      },
      deleteCliente() {
        this.clientes.splice(this.clienteIndexToDelete, 1);
        this.isDeleteModalOpen = false;
      },
    },
  };
  </script>
  