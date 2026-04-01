<template>
  <div class="about-page">
    <div class="info-block">
      <div class="info-image">
        <img src="../assets/bienvenu.png" alt="Bienvenue" />
      </div>
      <div class="info-text">
        <h2>Bienvenue sur notre site de voyage</h2>
        <p>
          Ce site permet de rechercher facilement des vols et hôtels, de consulter les informations sur le voyage, et de nous contacter. Réalisé dans le cadre d’un projet académique par Rémi Kalkan.
        </p>
      </div>
    </div>

    <router-link to="/vols" class="info-block">
      <div class="info-image">
        <img src="../assets/home-flights.png" alt="Vols" />
      </div>
      <div class="info-text">
        <h2>Vols</h2>
        <p>
          Recherchez des vols précis et comparez les horaires et prix en temps réel.
        </p>
      </div>
    </router-link>

    <router-link to="/hotels" class="info-block">
      <div class="info-image">
        <img src="../assets/about-hotels.png" alt="Hôtels" />
      </div>
      <div class="info-text">
        <h2>Hôtels</h2>
        <p>
          Trouvez les hôtels correspondant à vos dates et votre budget avec photos et notes.
        </p>
      </div>
    </router-link>

    <router-link to="/apropos" class="info-block">
      <div class="info-image">
        <img src="../assets/home-about.png" alt="À propos" />
      </div>
      <div class="info-text">
        <h2>À propos</h2>
        <p>
          Découvrez les fonctionnalités de notre site et la technologie utilisée pour les recherches.
        </p>
      </div>
    </router-link>

    <router-link to="/contact" class="info-block">
      <div class="info-image">
        <img src="../assets/about-site.jpg" alt="Contact" />
      </div>
      <div class="info-text">
        <h2>Contact</h2>
        <p>
          Contactez-nous pour toute question ou assistance concernant vos voyages.
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  background: #fff7f0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.info-block {
  display: flex;
  width: 1280px;
  background-color: #ff6600; 
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(255, 102, 0, 0.4);
  cursor: pointer;
  transition: background-color 0.4s ease;
  align-items: stretch;
  text-decoration: none;
}

.info-block:hover {
  background-color: #cc3300; 
  box-shadow: 0 8px 20px rgba(204, 51, 0, 0.6);
}

.info-image {
  flex-shrink: 0;
  width: 160px;
  height: auto;
  display: flex;
  align-items: stretch;
}

.info-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  display: block;
}

.info-image img:hover {
  transform: scale(1.05);
}

.info-text {
  flex-grow: 1;
  padding: 24px 30px;
  color: #fff3e6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-wrap: break-word;
}

.info-text h2 {
  margin: 0 0 12px 0;
  font-weight: 700;
  font-size: 24px;
  color: #fffde7;
}

.info-text p {
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
  color: #ffeacc;
}

@media (max-width: 1280px) {
  .info-block {
    flex-direction: column;
    width: 90vw;
  }
  .info-image {
    width: 100%;
    height: 200px;
    border-radius: 12px 12px 0 0;
  }
  .info-text {
    padding: 20px;
  }
}
</style>