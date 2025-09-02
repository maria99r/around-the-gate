import { defineStore } from "pinia";
import axios from "axios";

export const useFlightsStore = defineStore("flights", {
  state: () => ({
    flights: [],
    loading: false,
    error: null,
  }),

  actions: {
    async loadFlights() {
      this.loading = true;
      this.error = null;

      try {
        // API Aena para Málaga y salidas
        const response = await axios.get(
          "/api/sites/Satellite?pagename=AENA_ConsultarVuelos&airport=AGP&flightType=S&limit=20&dosDias=si"
        );
        this.flights = response.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
