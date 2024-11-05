<template>
  <div class="flex flex-col mt-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold">Gestión de Clientes</h2>
      <button @click="openAddClientModal" class="px-4 py-2 bg-[#e63946] hover:bg-[#d62839] text-white rounded">Agregar Cliente</button>
    </div>

    <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">ID</th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">Nombre</th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">Tipo de Documento</th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">Número de Documento</th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">Teléfono</th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-800 uppercase bg-gray-50 border-b border-gray-200">Dirección</th>
              <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-800 uppercase bg-gray-50 border-b border-gray-200">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="client in clients" :key="client.id">
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-gray-700 text-sm">{{ client.id }}</td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-gray-700 text-sm">{{ client.nombre }}</td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-gray-700 text-sm">{{ client.tipo_documento.nombre }}</td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-gray-700 text-sm">{{ client.numero_documento }}</td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-gray-700 text-sm">{{ client.telefono }}</td>
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-gray-700 text-sm">{{ client.direccion }}</td>
              <td class="px-8 py-4 text-sm font-medium leading-5 text-center border-b border-gray-200 whitespace-nowrap">
                <button @click="openEditClientModal(client)" class="px-3 py-2 text-white bg-[#e63946] hover:bg-[#d62839] hover:bg-blue-700 rounded"><i class="fas fa-edit"></i></button>
                <button @click="confirmDeleteClient(client)" class="ml-4 px-3 py-2 text-white bg-red-600 hover:bg-red-700 rounded"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal para agregar cliente -->
    <div v-if="isAddClientModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-lg font-semibold mb-4">Agregar Cliente</h3>
        <form @submit.prevent="addClient">
          <label for="clientNombre" class="block mb-2">Nombre:</label>
          <input
            id="clientNombre"
            type="text"
            v-model="newClient.nombre"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          />
          <label for="clientTipoDocumento" class="block mb-2 mt-4">Tipo de Documento:</label>
          <select
            id="clientTipoDocumento"
            v-model="newClient.id_tipo_documento"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option v-for="tipo in tiposDocumentos" :key="tipo.id" :value="tipo.id">{{ tipo.nombre }}</option>
          </select>
          <label for="clientNumeroDocumento" class="block mb-2 mt-4">Número de Documento:</label>
          <input
            id="clientNumeroDocumento"
            type="text"
            v-model="newClient.numero_documento"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          />
          <label for="clientTelefono" class="block mb-2 mt-4">Teléfono:</label>
          <input
            id="clientTelefono"
            type="text"
            v-model="newClient.telefono"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
          />
          <label for="clientDireccion" class="block mb-2 mt-4">Dirección:</label>
          <input
            id="clientDireccion"
            type="text"
            v-model="newClient.direccion"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
          />
          <div class="flex justify-end mt-4">
            <button @click="isAddClientModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-[#e63946] hover:bg-[#d62839] text-white rounded">Agregar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal para editar cliente -->
    <div v-if="isEditClientModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-lg font-semibold mb-4">Editar Cliente: {{ editClient.nombre }}</h3>
        <form @submit.prevent="updateClient">
          <label for="editClientNombre" class="block mb-2">Nombre:</label>
          <input
            id="editClientNombre"
            type="text"
            v-model="editClient.nombre"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          />
          <label for="editClientTipoDocumento" class="block mb-2 mt-4">Tipo de Documento:</label>
          <select
            id="editClientTipoDocumento"
            v-model="editClient.id_tipo_documento"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option v-for="tipo in tiposDocumentos" :key="tipo.id" :value="tipo.id">{{ tipo.nombre }}</option>
          </select>
          <label for="editClientNumeroDocumento" class="block mb-2 mt-4">Número de Documento:</label>
          <input
            id="editClientNumeroDocumento"
            type="text"
            v-model="editClient.numero_documento"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
            required
          />
          <label for="editClientTelefono" class="block mb-2 mt-4">Teléfono:</label>
          <input
            id="editClientTelefono"
            type="text"
            v-model="editClient.telefono"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
          />
          <label for="editClientDireccion" class="block mb-2 mt-4">Dirección:</label>
          <input
            id="editClientDireccion"
            type="text"
            v-model="editClient.direccion"
            class="mt-1 w-full border border-gray-300 rounded-md p-2"
          />
          <div class="flex justify-end mt-4">
            <button @click="isEditClientModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-[#e63946] hover:bg-[#d62839] text-white rounded">Actualizar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de Confirmación de Eliminación -->
    <div v-if="isDeleteClientModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-lg font-semibold mb-4">Eliminar Cliente</h3>
        <p>¿Estás seguro de que deseas eliminar al cliente {{ clientToDelete.nombre }}?</p>
        <div class="flex justify-end mt-4">
          <button @click="isDeleteClientModalOpen = false" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancelar</button>
          <button @click="deleteClient(clientToDelete.id)" class="px-4 py-2 bg-red-600 text-white rounded">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

interface Client {
  id: number;
  nombre: string;
  id_tipo_documento: number;
  numero_documento: string;
  telefono?: string;
  direccion?: string;
  tipo_documento: { id: number; nombre: string };
}

interface TipoDocumento {
  id: number;
  nombre: string;
}

export default defineComponent({
  setup() {
    const clients = ref<Client[]>([
      { id: 1, nombre: "Carlos Pérez", id_tipo_documento: 1, numero_documento: "12345678", telefono: "987654321", direccion: "Calle 1", tipo_documento: { id: 1, nombre: "DNI" } },
      { id: 2, nombre: "María López", id_tipo_documento: 1, numero_documento: "87654321", telefono: "123456789", direccion: "Avenida 2", tipo_documento: { id: 2, nombre: "RUC" } },
      { 
        "id": 3, 
        "nombre": "Juan Martínez", 
        "id_tipo_documento": 1, 
        "numero_documento": "23456789", 
        "telefono": "987123456", 
        "direccion": "Calle 3", 
        "tipo_documento": { "id": 1, "nombre": "DNI" } 
    },
    { 
        "id": 4, 
        "nombre": "Compañía de Servicios S.A.", 
        "id_tipo_documento": 2, 
        "numero_documento": "34567890", 
        "telefono": "654987321", 
        "direccion": "Boulevard 4", 
        "tipo_documento": { "id": 2, "nombre": "RUC" } 
    },
    { 
        "id": 5, 
        "nombre": "Alimentos Saludables S.R.L.", 
        "id_tipo_documento": 2, 
        "numero_documento": "45678901", 
        "telefono": "321654987", 
        "direccion": "Avenida de la Salud 5", 
        "tipo_documento": { "id": 2, "nombre": "RUC" } 
    },
    { 
        "id": 6, 
        "nombre": "Laura Fernández", 
        "id_tipo_documento": 1, 
        "numero_documento": "56789012", 
        "telefono": "456789123", 
        "direccion": "Calle 6", 
        "tipo_documento": { "id": 1, "nombre": "DNI" } 
    },
    { 
        "id": 7, 
        "nombre": "Tecnologías Avanzadas S.A.C.", 
        "id_tipo_documento": 2, 
        "numero_documento": "67890123", 
        "telefono": "789123456", 
        "direccion": "Calle Innovación 7", 
        "tipo_documento": { "id": 2, "nombre": "RUC" } 
    }
    ]);

    const tiposDocumentos = ref<TipoDocumento[]>([
      { id: 1, nombre: "DNI" },
      { id: 2, nombre: "RUC" },
      { id: 3, nombre: "Pasaporte" },
    ]);

    const newClient = ref<{ nombre: string; id_tipo_documento: number; numero_documento: string; telefono?: string; direccion?: string }>({
      nombre: '',
      id_tipo_documento: 1,
      numero_documento: '',
      telefono: '',
      direccion: ''
    });

    const editClient = ref<Client>({ id: 0, nombre: '', id_tipo_documento: 1, numero_documento: '', telefono: '', direccion: '', tipo_documento: { id: 1, nombre: '' } });
    const clientToDelete = ref<Client>({ id: 0, nombre: '', id_tipo_documento: 1, numero_documento: '', telefono: '', direccion: '', tipo_documento: { id: 1, nombre: '' } });

    const isAddClientModalOpen = ref<boolean>(false);
    const isEditClientModalOpen = ref<boolean>(false);
    const isDeleteClientModalOpen = ref<boolean>(false);
    
    let nextClientId = 3;

    const openAddClientModal = () => {
      newClient.value = { nombre: '', id_tipo_documento: 1, numero_documento: '', telefono: '', direccion: '' };
      isAddClientModalOpen.value = true;
    };

    const addClient = () => {
      if (newClient.value.nombre.trim() && newClient.value.numero_documento.trim()) {
        clients.value.push({
          id: nextClientId++,
          ...newClient.value,
          tipo_documento: tiposDocumentos.value.find(tipo => tipo.id === newClient.value.id_tipo_documento)!,
        });
        isAddClientModalOpen.value = false;
      }
    };

    const openEditClientModal = (client: Client) => {
      editClient.value = { ...client };
      isEditClientModalOpen.value = true;
    };

    const updateClient = () => {
      const index = clients.value.findIndex(c => c.id === editClient.value.id);
      if (index !== -1) {
        clients.value[index] = { ...editClient.value, tipo_documento: tiposDocumentos.value.find(tipo => tipo.id === editClient.value.id_tipo_documento)! };
      }
      isEditClientModalOpen.value = false;
    };

    const confirmDeleteClient = (client: Client) => {
      clientToDelete.value = client;
      isDeleteClientModalOpen.value = true;
    };

    const deleteClient = (id: number) => {
      clients.value = clients.value.filter(client => client.id !== id);
      isDeleteClientModalOpen.value = false;
    };

    return {
      clients,
      tiposDocumentos,
      newClient,
      editClient,
      clientToDelete,
      isAddClientModalOpen,
      isEditClientModalOpen,
      isDeleteClientModalOpen,
      openAddClientModal,
      addClient,
      openEditClientModal,
      updateClient,
      confirmDeleteClient,
      deleteClient,
    };
  },
});
</script>

<style scoped>
/* Personaliza estilos aquí */
</style>
