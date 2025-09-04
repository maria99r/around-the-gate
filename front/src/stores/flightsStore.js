import { defineStore } from "pinia";
import { ref } from "vue";
import { getFlightsByAirport, getAirports } from "../services/ApiFlights";

export const useFlightsStore = defineStore("flights", () => {
  const flights = ref([]);
  const airports = ref([]);
  const loading = ref(false);

  const actualAirport = ref({ code: "AGP", name: "málaga-costa-del-sol" });
  const typeOfInfo = ref("S"); // o L

  async function loadAirports() {
    airports.value = await getAirports();

    if (airports.value[actualAirport.value.code]) {
      actualAirport.value.name = airports.value[actualAirport.value.code][0];
    }
  }

  async function loadFlights(
    airport = actualAirport.value.code,
    type = typeOfInfo.value
  ) {
    loading.value = true;

    actualAirport.value = {
      code: airport,
      name: airports.value[airport]?.[0] || "",
    };

    flights.value = await getFlightsByAirport(airport, type);
    loading.value = false;
  }

  async function changeType(type) {
    if (type == "S") {
      type = "S";
    } else type = "L";

    await loadFlights(actualAirport.value.code, typeOfInfo.value);
  }

  return {
    changeType,
    flights,
    airports,
    actualAirport,
    typeOfInfo,
    loading,
    loadAirports,
    loadFlights,
  };
});
