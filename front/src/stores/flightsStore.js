import { defineStore } from "pinia";
import { ref } from "vue";
import { getFlightsByAirport, getAirports } from "../services/ApiFlights";

export const useFlightsStore = defineStore("flights", () => {
  const flights = ref([]);
  const airports = ref([]);

  async function loadAirports() {
    airports.value = await getAirports();
  }

  async function loadFlights(airport = "AGP", type = "S") {
    flights.value = await getFlightsByAirport(airport, type);
  }

  return { flights, airports, loadAirports, loadFlights };
});
