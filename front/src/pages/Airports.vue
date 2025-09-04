<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import { useFlightsStore } from "../stores/flightsStore";

const flightsStore = useFlightsStore();
const router = useRouter();

onMounted(async () => {
  await flightsStore.loadAirports();
});

function selectAirport(iata) {
  flightsStore.loadFlights(iata, flightsStore.typeOfInfo);

  router.push({ name: "home" });
}
</script>

<template>
  <nav class="flex center flex-col items-center gap-3">
    <img src="/aeropuertos.webp" class="h-15" />
  </nav>
  <br />

  <!--  <h1>LISTADO DE AEROPUERTOS</h1>-->
  <ul class="list-none columns-2 gap-16 mb-20">
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
      ]"
    >
      Salidas
    </button>

    <button
      @click="flightsStore.changeType('L') && router.push({ name: 'home' })"
      :class="[
        'flex-1 text-center text-gray-400 hover:text-white transition-colors',
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

nav {
  justify-self: center;
}
</style>
