<template>
  <DataTable :data="flights" :columns="columns" class="display stripe hover" />
</template>

<script setup>
import { computed, onMounted } from "vue";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
DataTable.use(DataTablesCore);

import { useFlightsStore } from "../stores/flights";

const store = useFlightsStore();

// columnas tabla de vuelos
const columns = [
  { data: "numVuelo", title: "Vuelo" },
  { data: "nombreCompania", title: "Compañía" },
  { data: "ciudadIataOtro", title: "Destino" },
  { data: "horaProgramada", title: "Hora Prog." },
  { data: "horaEstimada", title: "Hora Est." },
  { data: "estado", title: "Estado" },
];

const flights = computed(() => store.flights);

onMounted(() => {
  store.loadFlights();
});
</script>

<!--
<style>
@import 'datatables.net-dt/css/jquery.dataTables.css';
</style>-->
