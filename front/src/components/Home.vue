<script setup>
import { onMounted } from "vue";
import FlightsBoard from "./FlightsBoard.vue";

import { useFlightsStore } from "../stores/flightsStore";

const flightsStore = useFlightsStore();

onMounted(async () => {
  await flightsStore.loadAirports();
});

function selectAirport(iata) {
  flightsStore.loadFlights(iata, flightsStore.typeOfInfo);
}

let now = new Date();
</script>

<template>
  <!-- Logo inspired by rawpixel.com / Freepik -->
  <!--<button @click="flightsStore.changeType()">
    Ver {{ flightsStore.typeOfInfo === "S" ? "llegadas" : "salidas" }}
  </button>-->
  <nav class="flex center flex-col items-center gap-3">
    <img
      v-if="flightsStore.typeOfInfo == 'S'"
      src="/salidas.webp"
      class="w-50"
    />
    <img
      v-if="flightsStore.typeOfInfo == 'L'"
      src="/llegadas.webp"
      class="w-50"
    />

    <h3 class="capitalize">
      <strong>{{ flightsStore.actualAirport.code }}</strong> -
      {{ flightsStore.actualAirport.name.replace(/-/g, " ") }}
    </h3>
  </nav>
  <header>
    <p>Hora local</p>
    <p>
      {{
        ("0" + now.getHours()).slice(-2) +
        ":" +
        ("0" + now.getMinutes()).slice(-2)
      }}
    </p>
  </header>
  <!--  <h1>LISTADO DE AEROPUERTOS</h1>
  <ul class="list-none columns-2 gap-16">
    <li
      v-for="([iata, name], index) in Object.entries(flightsStore.airports)"
      :key="iata"
      class="mb-2 font-semibold capitalize"
    >
      <a
        :href="`?airport=${iata}`"
        class="hover:underline"
        @click.prevent="selectAirport(iata)"
      >
        {{ name[0].replace(/-/g, " ") }} ({{ iata }})
      </a>
    </li>
  </ul>
-->
  <FlightsBoard></FlightsBoard>

  <footer>
    <button>Aeropuertos</button>
    <button>Salidas</button><button>LLegadas</button>
  </footer>
</template>

<style>
.dt-length {
  display: none !important;
}

nav {
  position: absolute;
  top: 0;
  justify-self: center;
}
</style>
