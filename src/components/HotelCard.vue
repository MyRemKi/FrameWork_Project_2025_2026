<template>
  <div class="container">
    <button @click="$router.back()" class="btn-back">🔙 Retour</button>

    <div v-if="loading" class="loading">Chargement...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="hotel" class="hotel-detail">
      <h1>{{ hotel.name || hotel.title }}</h1>
      <p>Adresse : {{ hotel.address || "-" }}</p>
      <p>Prix par nuit : {{ hotel.rate_per_night?.lowest || "-" }} €</p>
      <p>⭐ Note : {{ hotel.extracted_rating || "-" }}</p>
      <p>Check-in : {{ checkIn }}</p>
      <p>Check-out : {{ checkOut }}</p>
      <p>Adultes : {{ adultsCount }}</p>

      <div v-if="hotel.images?.length" class="images">
        <img v-for="(img,i) in hotel.images" :key="i" :src="img.thumbnail" class="hotel-img"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    hotelId: {
      type: String,
      required: true
    },
    check_in_date: {
      type: String,
      default: ""
    },
    check_out_date: {
      type: String,
      default: ""
    },
    adults: {
      type: [Number,String],
      default: 1
    }
  },
  data() {
    return {
      hotel: null,
      loading: false,
      error: "",
      // on initialise les champs à partir des props
      checkIn: this.check_in_date,
      checkOut: this.check_out_date,
      adultsCount: this.adults
    };
  },
  mounted() {
    this.fetchHotel();
  },
  methods: {
    async fetchHotel() {
      if (!this.hotelId) {
        this.error = "Aucun hôtel sélectionné";
        return;
      }

      this.loading = true;
      try {
        const res = await axios.get("http://localhost:3000/api/hotels_by_id", {
          params: {
            hotel_id: this.hotelId,
            check_in_date: this.checkIn,
            check_out_date: this.checkOut,
            adults: this.adultsCount
          }
        });

        // On prend le premier hôtel retourné
        this.hotel = res.data.hotels?.[0] || null;

        if (!this.hotel) this.error = "Hôtel introuvable";
      } catch (err) {
        console.error("Erreur récupération hôtel:", err);
        this.error = "Erreur API";
      }
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.container{
  max-width: 900px;
  margin: auto;
  padding-top: 50px;
}

.btn-back{
  background: #1e88e5;
  color:white;
  border:none;
  padding:10px 15px;
  border-radius:50px;
  cursor:pointer;
  font-weight:bold;
  margin-bottom:20px;
}

.hotel-detail{
  background:white;
  padding:20px;
  border-radius:12px;
  box-shadow:0 2px 10px rgba(0,0,0,0.1);
}

.hotel-detail h1{
  color:#1e88e5;
  margin-bottom:10px;
}

.hotel-detail p{
  margin:5px 0;
}

.images{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  margin-top:15px;
}

.hotel-img{
  width:150px;
  height:100px;
  border-radius:8px;
  object-fit:cover;
}

.loading{
  font-weight:bold;
}

.error{
  color:red;
  font-weight:bold;
}
</style>