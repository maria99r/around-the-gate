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

  <!--  <h1>LISTADO DE AEROPUERTOS</h1>-->
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

  <footer
    class="fixed bottom-0 left-0 w-full flex justify-around items-center bg-black py-3 border-t border-gray-800"
  >
    <RouterLink
      :to="{ name: 'airports' }"
      class="flex-1 text-center text-gray-400 hover:text-white transition-colors"
      active-class="text-[color:var(--primary-color)]"
    >
      Aeropuertos
    </RouterLink>

    <button
      @click="flightsStore.changeType('S') && router.push({ name: 'home' })"
      :class="[
        'flex-1 text-center text-gray-400 hover:text-white transition-colors',
        flightsStore.typeOfInfo === 'S'
          ? 'text-[color:var(--primary-color)]'
          : '',
      ]"
    >
      Salidas
    </button>

    <button
      @click="flightsStore.changeType('L') && router.push({ name: 'home' })"
      :class="[
        'flex-1 text-center text-gray-400 hover:text-white transition-colors',
        flightsStore.typeOfInfo === 'L'
          ? 'text-[color:var(--primary-color)]'
          : '',
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
  position: absolute;
  top: 0;
  justify-self: center;
}
</style>
