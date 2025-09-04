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
      responsive: true,
    }"
  />

  <div v-else>No hay información de vuelos para los próximos 2 días.</div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
DataTable.use(DataTablesCore);

import { useFlightsStore } from "../stores/flightsStore";

const store = useFlightsStore();

// tamaño de ventana
const windowWidth = ref(window.innerWidth);

window.addEventListener("resize", () => {
  windowWidth.value = window.innerWidth;
});
const isMobile = computed(() => windowWidth.value <= 640); // móvil

// columnas tabla de vuelos
const columns = computed(() => {
  const isSalidas = store.typeOfInfo === "S";

  if (isMobile.value) {
    // movil
    if (isSalidas) {
      return [
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
        {
          data: "ciudadIataOtro",
          title: "Destino",
          render: (data) => data || "",
        },
        {
          data: null,
          title: "Vuelo",
          render: (data) => {
            const code = data.oaciCompania || data.iataCompania || "";
            return `<span>${code}${data.numVuelo}</span>`;
          },
        },
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
                color = "text-yellow-500";
                break;
              case "IBK":
                state = "Entrega equipaje";
                color = "text-emerald-500";
                break;
              case "OPE":
                state = "Aterrizado";
                color = "text-green-500";
                break;
              case "FNL":
                state = "Finalizado";
                color = "text-gray-500";
                break;
              case "HOR":
                state = "En hora";
                break;
              case "INI":
                state = "En hora";
                break;
              case "EMB":
                state = "Embarcando";
                color = "text-green-500";
                break;
              case "LND":
                state = "Aterrizando";
                color = "text-green-700";
                break;
              case "SCH":
                state = "Programado";
                break;
              case "CER":
                state = "Embarque cerrado";
                color = "text-red-500";
                break;
              case "BOR":
                state = "Finalizado";
                color = "text-gray-500";
                break;
              case "CNL":
                state = "Cancelado";
                color = "bg-red-200 text-red-900";
                break;
            }
            return `<span class="font-semibold ${color}">${state}</span>`;
          },
        },
      ];
    } else {
      // Llegadas móvil
      return [
        {
          data: null,
          title: "Hora",
          render: (data) => {
            const horaProg = data.horaProgramada;
            const horaEst = data.horaEstimada;
            if (!horaEst || horaEst === horaProg)
              return `<span style="font-weight:bold;">${horaProg}</span>`;
            return `<div><span style="text-decoration:line-through;color:#888;">${horaProg}</span><br/><span style="font-weight:bold;">${horaEst}</span></div>`;
          },
        },
        {
          data: "ciudadIataOtro",
          title: "Origen",
          render: (data) => data || "",
        },
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
                color = "text-yellow-500";
                break;
              case "IBK":
                state = "Entrega equipaje";
                color = "text-emerald-500";
                break;
              case "OPE":
                state = "Aterrizado";
                color = "text-green-500";
                break;
              case "FNL":
                state = "Finalizado";
                color = "text-gray-500";
                break;
              case "HOR":
                state = "En hora";
                break;
              case "INI":
                state = "En hora";
                break;
              case "EMB":
                state = "Embarcando";
                color = "text-green-500";
                break;
              case "LND":
                state = "Aterrizando";
                color = "text-green-700";
                break;
              case "SCH":
                state = "Programado";
                break;
              case "CER":
                state = "Embarque cerrado";
                color = "text-red-500";
                break;
              case "BOR":
                state = "Finalizado";
                color = "text-gray-500";
                break;
              case "CNL":
                state = "Cancelado";
                color = "bg-red-200 text-red-900";
                break;
            }
            return `<span class="font-semibold ${color}">${state}</span>`;
          },
        },
      ];
    }
  } else {
    // Escritorio: columnas completas (tu código actual)
    return [
      {
        data: null,
        title: "Hora",
        render: (data) => {
          const horaProg = data.horaProgramada;
          const horaEst = data.horaEstimada;
          if (!horaEst || horaEst === horaProg)
            return `<span style="font-weight:bold;">${horaProg}</span>`;
          return `<div><span style="text-decoration:line-through;color:#888;">${horaProg}</span><br/><span style="font-weight:bold;">${horaEst}</span></div>`;
        },
      },
      { data: "fecha", title: "Fecha", visible: false },
      { data: "horaEstimada", title: "horaEstimada", visible: false },
      {
        data: "ciudadIataOtro",
        title: isSalidas ? "Destino" : "Origen",
        render: (data) => data || "",
      },
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
      { data: "terminal", title: "Terminal" },
      {
        data: null,
        title: "Puerta",
        visible: isSalidas,
        render: (data) => data.puertaPrimera || "",
      },
      {
        data: null,
        title: "Facturación",
        visible: isSalidas,
        render: (data) =>
          `${data.mostradorDesde || ""}-${data.mostradorHasta || ""}`,
      },
      {
        data: null,
        title: "Sala / Cinta",
        visible: !isSalidas,
        render: (data) =>
          `${data.salaPrimera || ""} / ${
            data.cintaPrimera === "null" ? "-" : data.cintaPrimera
          }`,
      },
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
              color = "text-blue-500";
              break;
            case "IBK":
              state = "Entrega equipaje";
              color = "text-emerald-500";
              break;
            case "OPE":
              state = "Aterrizado";
              color = "text-green-500";
              break;
            case "FNL":
              state = "Finalizado";
              color = "text-gray-500";
              break;
            case "HOR":
              state = "En hora";
              break;
            case "INI":
              state = "En hora";
              break;
            case "EMB":
              state = "Embarcando";
              color = "text-green-500";
              break;
            case "LND":
              state = "Aterrizando";
              color = "text-green-700";
              break;
            case "SCH":
              state = "Programado";
              break;
            case "CER":
              state = "Embarque cerrado";
              color = "text-red-500";
              break;
            case "BOR":
              state = "Finalizado";
              color = "text-gray-500";
              break;
            case "CNL":
              state = "Cancelado";
              color = "bg-red-200 text-red-900";
              break;
          }
          return `<span class="font-semibold ${color}">${state}</span>`;
        },
      },
    ];
  }
});

const flights = computed(() => store.flights);

onMounted(() => {
  store.loadFlights();
});
</script>
