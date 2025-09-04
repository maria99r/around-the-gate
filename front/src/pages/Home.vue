<script setup>
import { onMounted } from "vue";
import FlightsBoard from "../components/FlightsBoard.vue";

import { useFlightsStore } from "../stores/flightsStore";

const flightsStore = useFlightsStore();

onMounted(async () => {
  await flightsStore.loadAirports();
});

let now = new Date();
</script>

<template>
  <!-- Logo inspired by rawpixel.com / Freepik -->
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
  <br />
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

  <FlightsBoard></FlightsBoard>

  <footer>
    <RouterLink
      :to="{ name: 'airports' }"
      class="text-center w-max mx-auto lg:mx-0 bg-blue-500 !text-white rounded-xl transition-all duration-200 hover:shadow-md hover:shadow-zinc-200 hover:translate-x-0.5 py-2 px-4"
    >
      Aeropuertos
    </RouterLink>
    <button
      @click="flightsStore.changeType()"
      class="text-center w-max mx-auto lg:mx-0 bg-blue-500 !text-white rounded-xl transition-all duration-200 hover:shadow-md hover:shadow-zinc-200 hover:translate-x-0.5 py-2 px-4"
    >
      Salidas
    </button>
    <button
      @click="flightsStore.changeType()"
      class="text-center w-max mx-auto lg:mx-0 bg-blue-500 !text-white rounded-xl transition-all duration-200 hover:shadow-md hover:shadow-zinc-200 hover:translate-x-0.5 py-2 px-4"
    >
      Llegadas
    </button>
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
