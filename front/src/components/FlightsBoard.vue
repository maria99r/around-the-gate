<template>
  <!-- Spinner mientras carga -->
  <div v-if="store.loading" class="flex justify-center my-6">
    <div
      class="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-yellow-500"
    ></div>
  </div>

  <DataTable
    v-else-if="!store.loading && flights.length > 0"
    :data="flights"
    :columns="columns"
    class="display stripe hover"
    :options="{
      order: [
        [1, 'asc'],
        [2, 'asc'],
      ],
    }"
  />

  <div v-else>No hay información de vuelos para los próximos 2 días.</div>
</template>

<script setup>
import { computed, onMounted, render } from "vue";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
DataTable.use(DataTablesCore);

import { useFlightsStore } from "../stores/flightsStore";

const store = useFlightsStore();

// columnas tabla de vuelos
const columns = [
  {
    data: null,
    title: "Hora",
    render: (data) => {
      const horaProg = data.horaProgramada;
      const horaEst = data.horaEstimada;

      if (!horaEst || horaEst === horaProg) {
        // solo programada
        return `<span style="font-weight: bold;">${horaProg}</span>`;
      }

      // programada tachada y estimada debajo
      return `
        <div>
          <span style="text-decoration: line-through; color: #888;">${horaProg}</span><br/>
          <span style="font-weight: bold;">${horaEst}</span>
        </div>
      `;
    },
  },
  { data: "fecha", title: "Fecha", visible: false },
  { data: "horaEstimada", title: "horaEstimada", visible: false },
  { data: "ciudadIataOtro", title: "Destino" },
  {
    data: null,
    title: "Vuelo",
    render: (data) => {
      const code = data.oaciCompania || data.iataCompania || "";
      return `<span>${code}${data.numVuelo}</span>`;
    },
  },
  {
    data: "urlLogoCompaniaMobile",
    title: "Compañía",
    render: (data) => {
      if (!data) return "";
      const logoUrl = `http://localhost:8000/api/airline?url=${encodeURIComponent(
        data
      )}`;
      return `<img src="${logoUrl}" alt="logo" style="height:40px;" />`;
    },
    orderable: false,
  },
  //estado
  {
    data: "estado",
    title: "Estado",
    render: (data) => {
      let state = "";
      let color = "";

      switch (data) {
        case "ULL":
          state = "Última llamada";
          color = "text-orange-500";
          break;
        case "RET":
          state = "Retrasado";
          color = "text-red-500";
          break;
        case "FLY":
          state = "En vuelo";
          color = "text-gay-500";
          break;
        case "IBK":
          state = "Entrega equipaje";
          color = "text-gay-500";
          break;
        case "FNL":
          color = "text-gay-500";
          state = "Finalizado";
          break;
        case "HOR":
          state = "En hora";
          break;
        case "INI":
          color = "text-green-500";
          state = "Embarcando";
          break;
        case "EMB":
          color = "text-green-500";
          state = "Embarcando";
          break;
        case "LND":
          color = "text-green-500";
          state = "Aterrizando";
          break;
        case "SCH":
          state = "Programado";
          break;
        case "CER":
          color = "text-red-500";
          state = "Embarque cerrado";
          break;
        case "BOR":
          color = "text-gay-500";
          state = "Finalizado";
          break;
        case "CNL":
          state = "Cancelado";
          color = "bg-red-200 text-red-900";
          break;
        default:
          state = data;
      }
      return `<span class="font-semibold ${color}">${state}</span>`;
    },
  },
];

const flights = computed(() => store.flights);

onMounted(() => {
  store.loadFlights();
});
</script>
