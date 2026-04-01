<template>
  <div class="container">

    <!-- BARRE DE RECHERCHE -->
    <div class="search-bar">

      <!-- VILLE + SUGGESTIONS -->
      <div class="field autocomplete-box">
        <label>Destination</label>
        <input
          v-model="search.cityText"
          @input="searchDestinations"
          placeholder="Tapez le nom d'une ville"
        />
        <ul v-if="destinationSuggestions.length" class="dropdown">
          <li v-for="d in destinationSuggestions" :key="d.place_id" @click="selectDestination(d)">
            🌆 {{ d.value }}
          </li>
        </ul>
      </div>

      <!-- CHECK‑IN -->
      <div class="field">
        <label>Arrivée</label>
        <input ref="checkInInput" placeholder="YYYY-MM-DD"/>
      </div>

      <!-- CHECK‑OUT -->
      <div class="field">
        <label>Départ</label>
        <input ref="checkOutInput" placeholder="YYYY-MM-DD"/>
      </div>

      <!-- ADULTES -->
      <div class="field">
        <label>Adultes</label>
        <input type="number" v-model="search.adults" min="1"/>
      </div>

      <!-- PRIX MIN -->
      <div class="field">
        <label>Prix min (€)</label>
        <input type="number" v-model.number="search.price_min" min="0"/>
      </div>

      <!-- PRIX MAX -->
      <div class="field">
        <label>Prix max (€)</label>
        <input type="number" v-model.number="search.price_max" min="0"/>
      </div>

      <!-- BOUTON -->
      <button @click="getHotels" class="btn-search">🔍 Rechercher</button>
    </div>

    <!-- TRI -->
    <div v-if="hotels.length" class="sort-bar" style="margin-top:15px;">
      <label>Tri :</label>
      <select v-model="sortOption" @change="sortHotels">
        <option value="">Aucun</option>
        <option value="priceAsc">Prix ↑</option>
        <option value="priceDesc">Prix ↓</option>
        <option value="nameAsc">Nom A→Z</option>
        <option value="nameDesc">Nom Z→A</option>
      </select>
    </div>

    <!-- RESULTATS -->
    <div v-if="loading" class="loading">Chargement...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="hotels.length" class="results">
      <div
        v-for="(h,i) in hotels"
        :key="h.hotel_id || h.place_id || i"
        class="card"
        @click="goToHotelDetail(h)"
        style="cursor:pointer"
      >
        <img v-if="h.images?.length" :src="h.images[0].thumbnail" class="hotel-img"/>
        <div>
          <p class="hotel-name">{{ h.name || h.title }}</p>
          <p class="hotel-price">{{ h.total_price }} € pour {{ nights }} nuit(s)</p>
          <p class="hotel-rating">⭐ {{ h.extracted_rating || "-" }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default {
  data() {
    return {
      destinationSuggestions: [],
      hotels: [],
      loading: false,
      error: "",
      debounceTimer: null,
      nights: 0,
      sortOption: "",
      search: {
        cityText: "",
        check_in_date: "",
        check_out_date: "",
        adults: 2,
        price_min: 0,
        price_max: 0
      }
    };
  },

  mounted() {
    flatpickr(this.$refs.checkInInput, {
      dateFormat: "Y-m-d",
      onChange: (dates, dateStr) => this.search.check_in_date = dateStr
    });
    flatpickr(this.$refs.checkOutInput, {
      dateFormat: "Y-m-d",
      onChange: (dates, dateStr) => this.search.check_out_date = dateStr
    });
  },

  methods: {
    searchDestinations() {
      const text = this.search.cityText;
      if (text.length < 2) {
        this.destinationSuggestions = [];
        return;
      }

      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(async () => {
        try {
          const res = await axios.get("http://localhost:3000/api/cities_suggestions", {
            params: { q: text }
          });
          this.destinationSuggestions = (res.data || []).map(c => ({
            value: c.name || c.city,
            place_id: c.place_id || c.id
          }));
        } catch (err) {
          console.error("Erreur suggestions villes :", err);
          this.destinationSuggestions = [];
        }
      }, 300);
    },

    selectDestination(d) {
      this.search.cityText = d.value;
      this.destinationSuggestions = [];
    },

    async getHotels() {
      if (!this.search.cityText || !this.search.check_in_date || !this.search.check_out_date) {
        this.error = "Veuillez remplir tous les champs";
        return;
      }

      this.loading = true;
      this.error = "";
      this.hotels = [];

      try {
        const res = await axios.get("http://localhost:3000/api/hotels", {
          params: {
            q: this.search.cityText,
            check_in_date: this.search.check_in_date,
            check_out_date: this.search.check_out_date,
            adults: this.search.adults
          }
        });

        // Nombre de nuits
        const nightsCalc = Math.max(1, (new Date(this.search.check_out_date) - new Date(this.search.check_in_date)) / (1000*60*60*24));
        this.nights = nightsCalc;

        // Total price et filtrage par min/max
        this.hotels = (res.data.hotels || []).map(h => {
          const pricePerNight = parseFloat(h.rate_per_night?.lowest);
          const totalPrice = !isNaN(pricePerNight) ? (pricePerNight * nightsCalc).toFixed(2) : "-";
          return {
            ...h,
            total_price: totalPrice
          };
        }).filter(h => {
          const price = parseFloat(h.total_price);
          return (!this.search.price_min || price >= this.search.price_min) &&
                 (!this.search.price_max || price <= this.search.price_max);
        });

        if (!this.hotels.length) this.error = "Aucun hôtel trouvé";
      } catch (err) {
        console.error("Erreur recherche hôtels:", err);
        this.error = "Erreur API";
      }
      this.loading = false;
    },

    sortHotels() {
      if (!this.sortOption) return;

      if (this.sortOption === "priceAsc") {
        this.hotels.sort((a,b) => parseFloat(a.total_price) - parseFloat(b.total_price));
      } else if (this.sortOption === "priceDesc") {
        this.hotels.sort((a,b) => parseFloat(b.total_price) - parseFloat(a.total_price));
      } else if (this.sortOption === "nameAsc") {
        this.hotels.sort((a,b) => (a.name || a.title).localeCompare(b.name || b.title));
      } else if (this.sortOption === "nameDesc") {
        this.hotels.sort((a,b) => (b.name || b.title).localeCompare(a.name || a.title));
      }
    },

    goToHotelDetail(hotel) {
      const hotelId = hotel.hotel_id || hotel.place_id;
      if (!hotelId) return;

      this.$router.push({
        name: "HotelCard",
        params: { hotelId },
        query: {
          check_in_date: this.search.check_in_date,
          check_out_date: this.search.check_out_date,
          adults: this.search.adults
        }
      });
    }
  }
};
</script>

<style scoped>
.container{
  max-width:1100px;
  margin:auto;
  padding-top:120px;
}

.search-bar{
  display:flex;
  align-items:center;
  gap:10px;
  background:white;
  padding:15px;
  border-radius:50px;
  box-shadow:0 4px 20px rgba(0,0,0,0.1);
  flex-wrap:wrap;
}

.field{
  position:relative;
  display:flex;
  flex-direction:column;
  min-width:180px;
}

.field input{
  border:none;
  outline:none;
  padding:10px;
  background:transparent;
  font-size:14px;
}

.autocomplete-box .dropdown{
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

.btn-search{
  background: #1e88e5;
  color:white;
  border:none;
  padding:12px 18px;
  border-radius:50px;
  cursor:pointer;
  font-weight:bold;
  margin-left:auto;
}

.card{
  background:white;
  margin-top:15px;
  padding:15px;
  border-radius:12px;
  box-shadow:0 2px 8px rgba(0,0,0,0.1);
  display:flex;
  align-items:center;
  gap:12px;
  transition: transform 0.2s;
}

.card:hover{
  transform: translateY(-3px);
}

.hotel-img{
  width:120px;
  height:80px;
  border-radius:8px;
  object-fit:cover;
}

.hotel-name{
  font-weight:bold;
  font-size:16px;
  color:#1e88e5;
}

.hotel-price{
  color:#d32f2f;
  font-weight:bold;
}

.hotel-rating{
  color:#f57c00;
}

.loading{
  margin-top:10px;
  font-weight:bold;
}

.error{
  color:red;
  margin-top:10px;
}

.sort-bar {
  display: flex;
  align-items: center;
  gap: 10px;
}

@media(max-width:768px){
  .search-bar{
    flex-wrap:wrap;
    border-radius:20px;
  }
}

</style>