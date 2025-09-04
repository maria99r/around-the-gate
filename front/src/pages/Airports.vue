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
  <br /><br />

  <!--  <h1>LISTADO DE AEROPUERTOS</h1>-->
  <ul class="list-none columns-1 sm:columns-2 gap-16 mb-20">
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
  <br />

  <footer
    class="fixed bottom-0 left-0 w-full flex justify-around items-center bg-black py-3 border-t border-gray-800"
  >
    <RouterLink
      :to="{ name: 'airports' }"
      class="group flex-1 flex flex-col items-center text-gray-400 hover:text-white transition-colors"
      active-class="text-[var(--secondary-color)]!"
    >
      <img
        src="/avion.webp"
        alt="icono avion"
        width="45px"
        class="transition duration-300 bg-gray-900"
        style="padding: 0.2rem; border-radius: 3px"
      />
      <span> Aeropuertos</span>
    </RouterLink>

    <button
      @click="flightsStore.changeType('S') && router.push({ name: 'home' })"
      :class="[
        'group flex-1 flex flex-col items-center text-gray-400 hover:text-white transition-colors',
      ]"
    >
      <img
        src="/salidas_icono.webp"
        alt="icono avion"
        width="45px"
        :class="['transition duration-300 group-hover:bg-gray-900']"
        style="padding: 0.2rem; border-radius: 3px"
      />
      <span> Salidas</span>
    </button>

    <button
      @click="flightsStore.changeType('L') && router.push({ name: 'home' })"
      :class="[
        'group flex-1 flex flex-col items-center text-gray-400 hover:text-white transition-colors',
      ]"
    >
      <img
        src="/llegadas_icono.webp"
        alt="icono llegadas"
        width="45px"
        :class="['transition duration-300 group-hover:bg-gray-900']"
        style="padding: 0.2rem; border-radius: 3px"
      />
      <span> Llegadas</span>
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
