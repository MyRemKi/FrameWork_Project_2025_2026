import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Vols from "../components/Flights.vue";
import Hotels from "../components/Hotels.vue";
import Contact from "../components/Contact.vue";
import About from "../components/About.vue";
import VolCard from "../components/FlightCard.vue";
import HotelCard from "../components/HotelCard.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/vols", component: Vols },
  {
    path: "/vols/:volId",
    name: "VolCard",
    component: VolCard,
    props: route => ({ volId: route.params.volId })
  },
  { path: "/hotels", component: Hotels },
  {
    path: "/hotels/:hotelId",
    name: "HotelCard",
    component: HotelCard,
    props: route => ({
      hotelId: route.params.hotelId,
      check_in_date: route.query.check_in_date,
      check_out_date: route.query.check_out_date,
      adults: route.query.adults
    })
  },
  { path: "/contact", component: Contact },
  { path: "/apropos", component: About }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;