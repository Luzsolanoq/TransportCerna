<template>
  <div class="container mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-3xl font-bold mb-6">Gestión de Viajes</h1>

    <!-- Sección Cliente -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Sección Cliente</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="clientNombre" class="block text-sm font-medium text-gray-700">Nombre Cliente:</label>
          <input
            id="clientNombre"
            type="text"
            v-model="client.nombre"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label for="clientDni" class="block text-sm font-medium text-gray-700">DNI:</label>
          <input
            id="clientDni"
            type="text"
            v-model="client.dni"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label for="clientTelefono" class="block text-sm font-medium text-gray-700">Teléfono:</label>
          <input
            id="clientTelefono"
            type="text"
            v-model="client.telefono"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label for="clientDireccion" class="block text-sm font-medium text-gray-700">Dirección:</label>
          <input
            id="clientDireccion"
            type="text"
            v-model="client.direccion"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div class="col-span-2">
          <label for="clientTipo" class="block text-sm font-medium text-gray-700">Tipo de Cliente:</label>
          <select
            id="clientTipo"
            v-model="client.tipo"
            @change="toggleEmpresa"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="natural">Natural</option>
            <option value="empresa">Empresa</option>
          </select>
        </div>

        <div v-if="isEmpresa" class="col-span-2">
          <label for="empresaNombre" class="block text-sm font-medium text-gray-700">Nombre de la Empresa:</label>
          <input
            id="empresaNombre"
            type="text"
            v-model="client.empresaNombre"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
      </div>
    </div>

    <!-- Sección Pasaje -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Sección Pasaje</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="viajeFecha" class="block text-sm font-medium text-gray-700">Fecha del Viaje:</label>
          <input
            id="viajeFecha"
            type="date"
            v-model="viaje.fecha"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label for="viajeHora" class="block text-sm font-medium text-gray-700">Hora del Viaje:</label>
          <input
            id="viajeHora"
            type="time"
            v-model="viaje.hora"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label for="viajeCosto" class="block text-sm font-medium text-gray-700">Costo del Pasaje:</label>
          <input
            id="viajeCosto"
            type="number"
            v-model="viaje.costo"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label for="viajeEstado" class="block text-sm font-medium text-gray-700">Estado:</label>
          <select
            id="viajeEstado"
            v-model="viaje.estado"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="pendiente">Pendiente</option>
            <option value="confirmado">Confirmado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
        <div class="col-span-2">
          <button @click="bookPasaje" class="px-4 py-2 bg-red-600 text-white rounded">Reservar Pasaje</button>
        </div>
      </div>
    </div>

    <!-- Sección Encomienda -->
    <div>
      <h2 class="text-2xl font-semibold mb-4">Sección Encomienda</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="encomiendaDestinatario" class="block text-sm font-medium text-gray-700">Destinatario:</label>
          <input
            id="encomiendaDestinatario"
            type="text"
            v-model="encomienda.destinatario"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label for="encomiendaTelefono" class="block text-sm font-medium text-gray-700">Teléfono Destinatario:</label>
          <input
            id="encomiendaTelefono"
            type="text"
            v-model="encomienda.telefono"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label for="encomiendaDescripcion" class="block text-sm font-medium text-gray-700">Descripción:</label>
          <input
            id="encomiendaDescripcion"
            type="text"
            v-model="encomienda.descripcion"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label for="encomiendaCosto" class="block text-sm font-medium text-gray-700">Costo de Encomienda:</label>
          <input
            id="encomiendaCosto"
            type="number"
            v-model="encomienda.costo"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div class="col-span-2">
          <button @click="sendEncomienda" class="px-4 py-2 bg-red-600 text-white rounded">Enviar Encomienda</button>
        </div>
      </div>
    </div>

    <!-- Sección de Cobro -->
    <div class="mt-6">
      <h2 class="text-2xl font-semibold mb-4">Sección de Cobro</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="cobroMonto" class="block text-sm font-medium text-gray-700">Monto Total a Cobrar:</label>
          <input
            id="cobroMonto"
            type="number"
            v-model="cobro.monto"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label for="cobroFecha" class="block text-sm font-medium text-gray-700">Fecha de Cobro:</label>
          <input
            id="cobroFecha"
            type="date"
            v-model="cobro.fecha"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div class="col-span-2">
          <button @click="processCobro" class="px-4 py-2 bg-red-600 text-white rounded">Procesar Cobro</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const client = ref({
      nombre: '',
      dni: '',
      telefono: '',
      direccion: '',
      tipo: 'natural',
      empresaNombre: '',
    });

    const isEmpresa = ref(false);

    const viaje = ref({
      fecha: '',
      hora: '',
      costo: 0,
      estado: 'pendiente',
    });

    const encomienda = ref({
      destinatario: '',
      telefono: '',
      descripcion: '',
      costo: 0,
    });

    const cobro = ref({
      monto: 0,
      fecha: '',
    });

    const toggleEmpresa = () => {
      isEmpresa.value = client.value.tipo === 'empresa';
      if (!isEmpresa.value) {
        client.value.empresaNombre = '';
      }
    };

    const bookPasaje = () => {
      // Lógica para reservar pasaje
      console.log('Pasaje reservado:', viaje.value);
    };

    const sendEncomienda = () => {
      // Lógica para enviar encomienda
      console.log('Encomienda enviada:', encomienda.value);
    };

    const processCobro = () => {
      // Lógica para procesar cobro
      console.log('Cobro procesado:', cobro.value);
    };

    return {
      client,
      isEmpresa,
      viaje,
      encomienda,
      cobro,
      toggleEmpresa,
      bookPasaje,
      sendEncomienda,
      processCobro,
    };
  },
});
</script>

<style scoped>
/* Personaliza estilos aquí */
</style>
