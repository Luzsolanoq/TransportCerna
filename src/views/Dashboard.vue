<template>
  <div class="container mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-3xl font-bold mb-6">Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-gray-100 p-4 rounded shadow">
        <h2 class="text-xl font-semibold">Usuarios Registrados</h2>
        <canvas id="usuariosChart" height="200"></canvas>
      </div>

      <div class="bg-gray-100 p-4 rounded shadow">
        <h2 class="text-xl font-semibold">Clientes Activos</h2>
        <canvas id="clientesChart" height="200"></canvas>
      </div>

      <div class="bg-gray-100 p-4 rounded shadow">
        <h2 class="text-xl font-semibold">Vehículos Disponibles</h2>
        <canvas id="vehiculosChart" height="200"></canvas>
      </div>

      <div class="bg-gray-100 p-4 rounded shadow">
        <h2 class="text-xl font-semibold">Viajes Realizados</h2>
        <canvas id="viajesChart" height="200"></canvas>
      </div>

      <div class="bg-gray-100 p-4 rounded shadow">
        <h2 class="text-xl font-semibold">Encomiendas Enviadas</h2>
        <canvas id="encomiendasChart" height="200"></canvas>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Chart from "chart.js/auto";

export default defineComponent({
  setup() {
    const createChart = (ctx: CanvasRenderingContext2D, labels: string[], data: number[], title: string) => {
      new Chart(ctx, {
        type: 'bar', // Tipo de gráfico
        data: {
          labels: labels,
          datasets: [{
            label: title,
            data: data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    };

    const initCharts = () => {
      const usuariosCtx = (document.getElementById('usuariosChart') as HTMLCanvasElement).getContext('2d');
      const clientesCtx = (document.getElementById('clientesChart') as HTMLCanvasElement).getContext('2d');
      const vehiculosCtx = (document.getElementById('vehiculosChart') as HTMLCanvasElement).getContext('2d');
      const viajesCtx = (document.getElementById('viajesChart') as HTMLCanvasElement).getContext('2d');
      const encomiendasCtx = (document.getElementById('encomiendasChart') as HTMLCanvasElement).getContext('2d');

      // Datos de ejemplo
      const usuariosData = [50, 60, 70, 80];
      const clientesData = [30, 40, 50, 60];
      const vehiculosData = [20, 30, 40, 50];
      const viajesData = [25, 35, 45, 55];
      const encomiendasData = [15, 25, 35, 45];

      createChart(usuariosCtx, ['Ene', 'Feb', 'Mar', 'Abr'], usuariosData, 'Usuarios Registrados');
      createChart(clientesCtx, ['Ene', 'Feb', 'Mar', 'Abr'], clientesData, 'Clientes Activos');
      createChart(vehiculosCtx, ['Ene', 'Feb', 'Mar', 'Abr'], vehiculosData, 'Vehículos Disponibles');
      createChart(viajesCtx, ['Ene', 'Feb', 'Mar', 'Abr'], viajesData, 'Viajes Realizados');
      createChart(encomiendasCtx, ['Ene', 'Feb', 'Mar', 'Abr'], encomiendasData, 'Encomiendas Enviadas');
    };

    onMounted(() => {
      initCharts();
    });

    return {};
  }
});
</script>

<style scoped>
/* Personaliza estilos aquí */
</style>
