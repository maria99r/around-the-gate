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
  <nav class="flex flex-col items-center gap-3">
    <img
      v-if="flightsStore.typeOfInfo == 'S'"
      src="/salidas.webp"
      class="h-15"
    />
    <img
      v-if="flightsStore.typeOfInfo == 'L'"
      src="/llegadas.webp"
      class="h-15"
    />

    <h3 class="capitalize">
      <strong>{{ flightsStore.actualAirport.code }}</strong> -
      {{ flightsStore.actualAirport.name.replace(/-/g, " ") }}
    </h3>
  </nav>
  <br />
  <header>
    <p><b>Hora local</b></p>
    <p>
      {{
        ("0" + now.getHours()).slice(-2) +
        ":" +
        ("0" + now.getMinutes()).slice(-2)
      }}
    </p>
  </header>

  <FlightsBoard></FlightsBoard>

  <footer
    class="fixed bottom-0 left-0 w-full flex justify-around items-center bg-black py-3 border-t border-gray-800"
  >
    <RouterLink
      :to="{ name: 'airports' }"
      class="flex-1 text-center text-gray-400 hover:text-white transition-colors"
      active-class="text-[var(--secondary-color)]!"
    >
      Aeropuertos
    </RouterLink>

    <button
      @click="flightsStore.changeType('S') && router.push({ name: 'home' })"
      :class="[
        'flex-1 text-center text-gray-400 hover:text-white transition-colors',
        flightsStore.typeOfInfo === 'S' ? 'text-[var(--secondary-color)]!' : '',
      ]"
    >
      Salidas
    </button>

    <button
      @click="flightsStore.changeType('L') && router.push({ name: 'home' })"
      :class="[
        'flex-1 text-center text-gray-400 hover:text-white transition-colors',
        flightsStore.typeOfInfo === 'L' ? 'text-[var(--secondary-color)]!' : '',
      ]"
    >
      Llegadas
    </button>
  </footer>
</template>

<style>
.dt-length {
  display: none !important;
}
</style>
