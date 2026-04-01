<template>
  <div id="app">
    <Navbar />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
  watch: {
    $route(to) {
      this.updateBodyBackground(to.name);
    }
  },
  mounted() {
    this.updateBodyBackground(this.$route.name);
  },
  methods: {
    updateBodyBackground(routeName) {
      if (routeName === "Hotel") {
        document.body.style.backgroundImage = "url('/assets/background_hotel.png')";
      } else {
        document.body.style.backgroundImage = "url('/assets/background_vol.png')";
      }
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";
    }
  }
};
</script>

<style>
.main-content {
  padding-top: 80px;
  transition: padding-top 0.3s ease;
}

@media (max-width: 1024px) {
  .main-content {
    padding-top: 90px;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding-top: 100px;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding-top: 110px;
  }
}
</style>