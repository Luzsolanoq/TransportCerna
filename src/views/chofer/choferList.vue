<template>
  <div class="flex flex-col mt-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold">Listado de Choferes</h2>
      <button @click="openRegisterModal" class="px-4 py-2 text-white bg-[#0369a1] hover:bg-[#0369a1] rounded">
        <i class="fas fa-plus"></i> Agregar Chofer
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
                Licencia
              </th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                Correo
              </th>
              <th class="px-8 py-3 text-sm font-medium leading-5 text-center text-gray-800 uppercase bg-gray-50 border-b border-gray-200">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(chofer, index) in choferes" :key="index">
              <td class="px-6 py-4 border-b border-gray-200">{{ chofer.id }}</td>
              <td class="px-6 py-4 border-b border-gray-200">{{ chofer.nombre }}</td>
              <td class="px-6 py-4 border-b border-gray-200">{{ chofer.apellidos }}</td>
              <td class="px-6 py-4 border-b border-gray-200">{{ chofer.dni }}</td>
              <td class="px-6 py-4 border-b border-gray-200">{{ chofer.licencia }}</td>
              <td class="px-6 py-4 border-b border-gray-200">{{ chofer.correo }}</td>
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

    <!-- Modal para editar chofer -->
    <div v-if="isEditModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-lg font-semibold mb-4">Editar Chofer</h3>
        <form @submit.prevent="updateChofer">
          <div class="mb-4">
            <label class="block text-gray-700" for="nombre">Nombre</label>
            <input type="text" v-model="editChoferData.nombre" id="nombre" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700" for="apellidos">Apellidos</label>
            <input type="text" v-model="editChoferData.apellidos" id="apellidos" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700" for="dni">DNI</label>
            <input type="text" v-model="editChoferData.dni" id="dni" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700" for="licencia">Licencia</label>
            <input type="text" v-model="editChoferData.licencia" id="licencia" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700" for="correo">Correo</label>
            <input type="email" v-model="editChoferData.correo" id="correo" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>

          <div class="flex justify-end">
            <button @click="isEditModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-[#0369a1] text-white rounded">Actualizar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal para registrar chofer -->
    <div v-if="isRegisterModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-lg font-semibold mb-4">Registrar Chofer</h3>
        <form @submit.prevent="registerChofer">
          <div class="mb-4">
            <label class="block text-gray-700" for="nombre">Nombre</label>
            <input type="text" v-model="newChoferData.nombre" id="nombre" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700" for="apellidos">Apellidos</label>
            <input type="text" v-model="newChoferData.apellidos" id="apellidos" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700" for="dni">DNI</label>
            <input type="text" v-model="newChoferData.dni" id="dni" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700" for="licencia">Licencia</label>
            <input type="text" v-model="newChoferData.licencia" id="licencia" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700" for="correo">Correo</label>
            <input type="email" v-model="newChoferData.correo" id="correo" class="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
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
        <h3 class="text-lg font-semibold mb-4">Eliminar Chofer</h3>
        <p>¿Estás seguro de que deseas eliminar al chofer <strong>{{ choferes[indexToDelete]?.nombre }}</strong>?</p>
        <div class="flex justify-end mt-4">
          <button @click="isDeleteModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
          <button @click="deleteChofer" class="px-4 py-2 bg-red-600 text-white rounded">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      choferes: [
      { id: 1, nombre: 'Juan', apellidos: 'Pérez', dni: '12345678', licencia: 'AB12345', correo: 'juan.perez@example.com' },
      { id: 2, nombre: 'Ana', apellidos: 'García', dni: '87654321', licencia: 'BC54321', correo: 'ana.garcia@example.com' },
      { id: 3, nombre: 'Luis', apellidos: 'Martínez', dni: '11223344', licencia: 'CD98765', correo: 'luis.martinez@example.com' },
      { id: 4, nombre: 'Carlos', apellidos: 'Rodríguez', dni: '23456789', licencia: 'DE67890', correo: 'carlos.rodriguez@example.com' },
      { id: 5, nombre: 'María', apellidos: 'López', dni: '34567890', licencia: 'EF78901', correo: 'maria.lopez@example.com' },
      { id: 6, nombre: 'Jorge', apellidos: 'Fernández', dni: '45678901', licencia: 'GH89012', correo: 'jorge.fernandez@example.com' },
      { id: 7, nombre: 'Sofía', apellidos: 'Martínez', dni: '56789012', licencia: 'HI90123', correo: 'sofia.martinez@example.com' },
      { id: 8, nombre: 'Diego', apellidos: 'Torres', dni: '67890123', licencia: 'IJ01234', correo: 'diego.torres@example.com' }
      ], // Aquí guardas los choferes
      isRegisterModalOpen: false,
      isEditModalOpen: false,
      isDeleteModalOpen: false,
      newChoferData: {
        nombre: '',
        apellidos: '',
        dni: '',
        licencia: '',
        correo: ''
      },
      editChoferData: {
        nombre: '',
        apellidos: '',
        dni: '',
        licencia: '',
        correo: ''
      },
      indexToDelete: null,
    };
  },
  methods: {
    openRegisterModal() {
      this.isRegisterModalOpen = true;
      this.newChoferData = {
        nombre: '',
        apellidos: '',
        dni: '',
        licencia: '',
        correo: ''
      };
    },
    registerChofer() {
      const newChofer = {
        id: this.choferes.length + 1, // Genera un ID único
        ...this.newChoferData
      };
      this.choferes.push(newChofer);
      this.isRegisterModalOpen = false;
    },
    openEditModal(index) {
      this.isEditModalOpen = true;
      this.editChoferData = { ...this.choferes[index] };
    },
    updateChofer() {
      const index = this.choferes.findIndex(chofer => chofer.id === this.editChoferData.id);
      if (index !== -1) {
        this.choferes[index] = { ...this.editChoferData };
      }
      this.isEditModalOpen = false;
    },
    openDeleteModal(index) {
      this.isDeleteModalOpen = true;
      this.indexToDelete = index;
    },
    deleteChofer() {
      this.choferes.splice(this.indexToDelete, 1);
      this.isDeleteModalOpen = false;
    },
  },
};
</script>

<style scoped>
/* Añade estilos aquí si es necesario */
</style>
