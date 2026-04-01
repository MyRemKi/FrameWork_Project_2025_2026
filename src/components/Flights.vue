<template>
<div class="container">

  <!-- BARRE HORIZONTALE -->
  <div class="search-bar">

    <!-- TYPE VOYAGE -->
    <div class="field type-field">
      <label>Type</label>
      <select v-model="search.roundtrip">
        <option :value="false">Aller simple</option>
        <option :value="true">Aller-retour</option>
      </select>
    </div>

    <!-- DEPART -->
    <div class="field autocomplete-box">
      <label>Départ</label>
      <input
        v-model="search.departureText"
        @input="searchAirports('departure')"
        placeholder="Ville ou aéroport"
      />
      <ul v-if="departureSuggestions.length" class="dropdown">
        <li v-for="a in departureSuggestions" :key="a.iata" @click="selectAirport(a,'departure')">
          ✈️ {{ a.display }}
        </li>
      </ul>
    </div>

    <!-- SWITCH -->
    <div class="swap" @click="swapAirports">⇄</div>

    <!-- ARRIVEE -->
    <div class="field autocomplete-box">
      <label>Arrivée</label>
      <input
        v-model="search.arrivalText"
        @input="searchAirports('arrival')"
        placeholder="Ville ou aéroport"
      />
      <ul v-if="arrivalSuggestions.length" class="dropdown">
        <li v-for="a in arrivalSuggestions" :key="a.iata" @click="selectAirport(a,'arrival')">
          ✈️ {{ a.display }}
        </li>
      </ul>
    </div>

    <!-- DATE ALLER -->
    <div class="field">
      <label>Aller</label>
      <input ref="dateInput" class="input" placeholder="Date aller"/>
    </div>

    <!-- DATE RETOUR -->
    <div class="field" v-if="search.roundtrip">
      <label>Retour</label>
      <input ref="returnDateInput" class="input" placeholder="Date retour"/>
    </div>

    <!-- BOUTON -->
    <button @click="getFlights" class="btn-search">🔍</button>

  </div>

  <!-- RESULTATS -->
  <div v-if="loading" class="loading">Chargement...</div>
  <div v-if="error" class="error">{{ error }}</div>

  <div v-if="flights.length">
    <div v-for="(f,i) in flights" :key="i" class="card">

      <p class="route">
        {{ f.flights.map(flight => flight.departure_airport?.id).join(' → ') }}
        → {{ f.flights[f.flights.length - 1]?.arrival_airport?.id }}
      </p>

      <p class="airline">{{ f.flights[0]?.airline }}</p>
      <p class="price">{{ f.price }} €</p>

      <a
        v-if="f.link"
        :href="f.link"
        target="_blank"
        class="btn-book"
        @click.prevent="selectFlight(f)"
      >
        Voir
      </a>

    </div>
  </div>

</div>
</template>

<script>
import axios from "axios"
import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"

export default {
  name: "Flight", // Nom de la route utilisé dans App.vue pour le background
  data() {
    return {
      departureSuggestions: [],
      arrivalSuggestions: [],
      flights: [],
      loading: false,
      error: "",
      returnPicker: null, // pour flatpickr

      search: {
        departureText: "",
        arrivalText: "",
        departure_id: "",
        arrival_id: "",
        date: "",
        return_date: "",
        roundtrip: false
      }
    }
  },

  mounted() {
    // DATE ALLER
    flatpickr(this.$refs.dateInput, {
      dateFormat: "Y-m-d",
      onChange: (selectedDates, dateStr) => {
        this.search.date = dateStr
      }
    })
  },

  watch: {
    'search.roundtrip'(val) {
      if(val){
        this.$nextTick(() => {
          if(!this.returnPicker){
            this.returnPicker = flatpickr(this.$refs.returnDateInput, {
              dateFormat: "Y-m-d",
              onChange: (selectedDates, dateStr) => {
                this.search.return_date = dateStr
              }
            })
          }
        })
      } else {
        this.search.return_date = ""
        if(this.returnPicker){
          this.returnPicker.destroy()
          this.returnPicker = null
        }
      }
    }
  },

  methods: {

    swapAirports() {
      const tempText = this.search.departureText
      const tempId = this.search.departure_id
      this.search.departureText = this.search.arrivalText
      this.search.departure_id = this.search.arrival_id
      this.search.arrivalText = tempText
      this.search.arrival_id = tempId
    },

    async searchAirports(type) {

      const text = type === "departure"
        ? this.search.departureText
        : this.search.arrivalText

      if(text.length < 2){
        if(type === "departure") this.departureSuggestions = []
        else this.arrivalSuggestions = []
        return
      }

      clearTimeout(this.debounceTimer)

      this.debounceTimer = setTimeout(async () => {

        try {
          const res = await axios.get("http://localhost:3000/api/airports_suggestions", {
            params: { q:text }
          })

          const suggestions = (res.data || []).map(a => ({
            city: a.city || a.name,
            country: a.country || "",
            iata: a.iata || a.id,
            display: a.country
              ? `${a.city || a.name} - ${a.country}`
              : `${a.city || a.name}`
          }))

          if(type === "departure") this.departureSuggestions = suggestions
          else this.arrivalSuggestions = suggestions

        } catch(e) {
          console.error(e)
        }

      }, 300)
    },

    selectAirport(a,type) {
      if(type === "departure") {
        this.search.departureText = a.display
        this.search.departure_id = a.iata
        this.departureSuggestions = []
      }
      if(type === "arrival") {
        this.search.arrivalText = a.display
        this.search.arrival_id = a.iata
        this.arrivalSuggestions = []
      }
    },

    async getFlights() {
      if(
        !this.search.departure_id ||
        !this.search.arrival_id ||
        !this.search.date ||
        (this.search.roundtrip && !this.search.return_date)
      ){
        this.error = "Veuillez remplir tous les champs"
        return
      }

      this.loading = true
      this.error = ""
      this.flights = []

      try {
        const params = {
          departure_id: this.search.departure_id,
          arrival_id: this.search.arrival_id,
          date: this.search.date
        }

        let res
        if(this.search.roundtrip){
          params.return_date = this.search.return_date
          res = await axios.get("http://localhost:3000/api/flights-roundtrip", { params })
        } else {
          res = await axios.get("http://localhost:3000/api/flights-oneway", { params })
        }

        this.flights = res.data.flights || []
        if(!this.flights.length) this.error="Aucun vol trouvé"

      } catch(err) {
        console.error(err)
        this.error="Erreur API"
      }

      this.loading = false
    },

    selectFlight(flight) {
      const dep = flight.flights[0]?.departure_airport
      const arr = flight.flights[flight.flights.length-1]?.arrival_airport
      if(dep && arr) {
        this.search.departureText = `${dep.city || dep.id} (${dep.id})`
        this.search.departure_id = dep.id
        this.search.arrivalText = `${arr.city || arr.id} (${arr.id})`
        this.search.arrival_id = arr.id
        if(flight.flights[0]?.departure_time) {
          this.search.date = flight.flights[0].departure_time.split("T")[0]
        }
      }
      if(flight.link) window.open(flight.link, "_blank")
    }

  }
}
</script>

<style scoped>
/* =================== CONTENEUR PRINCIPAL =================== */
.container{
  max-width:1100px;
  margin:auto;
  padding-top:120px;
}

/* =================== BARRE DE RECHERCHE =================== */
.search-bar{
  display:flex;
  align-items:center;
  gap:10px;
  background:white;
  padding:12px;
  border-radius:50px;
  box-shadow:0 4px 20px rgba(0,0,0,0.1);
  flex-wrap:wrap;
}

.btn-search{
  margin-left:auto;
  background:#1a73e8;
  color:white;
  border:none;
  padding:12px;
  border-radius:50%;
  cursor:pointer;
  flex-shrink:0;
}

/* =================== CHAMPS =================== */
.field{
  position:relative;
  display:flex;
  flex-direction:column;
  min-width:180px;
}

.type-field{
  min-width:140px;
}

.field input, select{
  border:none;
  outline:none;
  padding:8px;
  background:transparent;
}

/* =================== DROPDOWN =================== */
.dropdown{
  position:absolute;
  top:60px;
  background:white;
  border-radius:10px;
  box-shadow:0 5px 15px rgba(0,0,0,0.1);
  width:100%;
  max-height:200px;
  overflow:auto;
  z-index:10;
}

.dropdown li{
  padding:10px;
  cursor:pointer;
}

.dropdown li:hover{
  background:#f0f4ff;
}

/* =================== SWAP =================== */
.swap{
  cursor:pointer;
  font-size:20px;
  padding:5px 10px;
}

/* =================== CARDS =================== */
.card{
  background:white;
  margin-top:15px;
  padding:15px;
  border-radius:12px;
  box-shadow:0 2px 8px rgba(0,0,0,0.1);
}

.route{
  font-weight:bold;
  font-size:18px;
}

.airline{
  color:#555;
}

.price{
  color:#1a73e8;
  font-weight:bold;
}

.btn-book{
  display:inline-block;
  margin-top:10px;
  background:#34a853;
  color:white;
  padding:6px 12px;
  border-radius:6px;
}

/* =================== ERREUR ET LOADING =================== */
.error{
  color:red;
  margin-top:10px;
}

.loading{
  margin-top:10px;
  font-weight:bold;
}

/* =================== RESPONSIVE =================== */
@media(max-width:768px){
  .search-bar{
    flex-wrap:wrap;
    border-radius:20px;
  }
}
</style>