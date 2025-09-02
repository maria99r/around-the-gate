<script setup>
import { onMounted, onUnmounted } from "vue";
import FlightsBoard from "./FlightsBoard.vue";

import { useFlightsStore } from "../stores/flightsStore";

const flightsStore = useFlightsStore();

onMounted(() => {
  flightsStore.loadAirports();
});
</script>

<template>
  <!-- Logo inspired by rawpixel.com / Freepik -->
  <nav></nav>
  <h1>LISTADO DE AEROPUERTOS</h1>
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
  <FlightsBoard></FlightsBoard>
</template>

<style scoped></style>
