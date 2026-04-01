<template>
  <div class="flight-card-page">
    <button @click="$router.back()" class="btn-back">← Retour</button>

    <h2>Détails du vol</h2>

    <div v-if="flight" class="info-block flight-detail">
      <p class="route"><strong>Itinéraire :</strong> {{ flightRoute }}</p>
      <p class="airline"><strong>Compagnie :</strong> {{ flight.flights[0].airline }}</p>
      <p class="price"><strong>Prix :</strong> {{ flight.price }} €</p>

      <div v-for="(leg, index) in flight.flights" :key="index" class="leg">
        <p>Départ : {{ leg.departure_airport.city || leg.departure_airport.id }} à {{ leg.departure_time }}</p>
        <p>Arrivée : {{ leg.arrival_airport.city || leg.arrival_airport.id }} à {{ leg.arrival_time }}</p>
      </div>

      <a :href="flight.link" target="_blank" class="btn-book">Réserver sur Google Flights</a>
    </div>

    <div v-else>
      <p>Aucun vol sélectionné.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlightCard",
  data() {
    return {
      flight: null
    }
  },
  computed: {
    flightRoute() {
      if (!this.flight) return ""
      const dep = this.flight.flights[0]?.departure_airport
      const arr = this.flight.flights[this.flight.flights.length - 1]?.arrival_airport
      return `${dep.city || dep.id} → ${arr.city || arr.id}`
    }
  },
  mounted() {
    if (this.$route.params.flight) {
      this.flight = JSON.parse(this.$route.params.flight)
    }
  }
}
</script>

<style scoped>
.flight-card-page{
  max-width:900px;
  margin:auto;
  padding:50px 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.btn-back{
  background:#ccc;
  border:none;
  padding:8px 12px;
  border-radius:6px;
  cursor:pointer;
  margin-bottom:20px;
}

.info-block.flight-detail{
  background: #ff6600;
  border-radius: 12px;
  padding:20px;
  color: #fff3e6;
  box-shadow:0 6px 15px rgba(255,102,0,0.4);
  transition: background 0.4s;
}

.info-block.flight-detail:hover{
  background: #cc3300;
  box-shadow:0 8px 20px rgba(204,51,0,0.6);
}

.route, .airline, .price{
  margin:5px 0;
  font-size:16px;
}

.leg{
  background: rgba(255,255,255,0.1);
  margin:10px 0;
  padding:10px;
  border-radius:6px;
}

.btn-book{
  display:inline-block;
  margin-top:10px;
  background:#34a853;
  color:white;
  padding:8px 16px;
  border-radius:6px;
  text-decoration:none;
}
</style>