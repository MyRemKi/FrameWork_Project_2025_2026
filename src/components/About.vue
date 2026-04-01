<template>
  <div class="about-page">
    <!-- Bloc Vols -->
    <div class="info-block">
      <div class="info-image">
        <img src="../assets/about-flights.png" alt="Vols" />
      </div>
      <div class="info-text">
        <h2>Informations sur les Vols</h2>
        <p>
          Notre site permet de rechercher des vols précis grâce à l'API 
          <a href="https://serpapi.com/google-flights-api" target="_blank" rel="noopener noreferrer" class="link">SerpAPI Google Flights</a>. 
          Cette API fournit des suggestions d'aéroports et de villes, des horaires détaillés, les compagnies aériennes et les prix actualisés en temps réel. 
          Vous pouvez comparer facilement plusieurs options pour trouver le meilleur vol selon vos besoins. 
          Les recherches peuvent être effectuées en aller-simple ou aller-retour. 
          Chaque résultat contient des informations claires sur l'heure de départ et d'arrivée, ainsi que la durée totale du vol. 
          Des liens directs vers Google Flights sont également fournis pour réserver en toute sécurité. 
          L'utilisation de SerpAPI garantit la fiabilité des données et évite toute erreur de scraping. 
          Vous bénéficiez d'une interface rapide et intuitive, adaptée aux utilisateurs mobiles comme desktop. 
          Le site permet de filtrer les résultats selon vos préférences. 
          Les informations sont mises à jour en continu pour refléter les disponibilités réelles. 
          Cela rend l'expérience complète, transparente et sécurisée pour tous vos déplacements.
        </p>
      </div>
    </div>

    <!-- Bloc Hôtels -->
    <div class="info-block">
      <div class="info-image">
        <img src="../assets/about-hotels.png" alt="Hôtels" />
      </div>
      <div class="info-text">
        <h2>Informations sur les Hôtels</h2>
        <p>
          Pour les hôtels, nous utilisons l'API 
          <a href="https://serpapi.com/google-hotels-api" target="_blank" rel="noopener noreferrer" class="link">SerpAPI Google Hotels</a> 
          afin de fournir des données fiables sur les établissements du monde entier. 
          Cette API permet d'obtenir le nom, l'adresse, les notes et le tarif par nuit pour chaque hôtel. 
          Vous pouvez consulter les disponibilités selon vos dates d'arrivée et de départ. 
          Le calcul automatique du prix total pour le nombre de nuits vous aide à mieux planifier votre budget. 
          Chaque hôtel est accompagné de photos et d'informations pratiques pour faciliter votre choix. 
          Grâce à SerpAPI, les informations sont actualisées en temps réel, garantissant des données exactes. 
          Vous pouvez filtrer les résultats selon vos préférences et voir les avis clients. 
          Vous bénéficiez d'une interface intuitive et responsive sur tous vos appareils. 
          L'expérience utilisateur est optimisée pour la rapidité et la clarté. 
          Enfin, l'API vous offre la possibilité de voir chaque hôtel en détail grâce à son `place_id`.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
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

/* Bloc orange par défaut avec transition rouge au hover */
.info-block {
  display: flex;
  width: 1280px;
  background-color: #ff6600; /* orange vif */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(255, 102, 0, 0.4);
  cursor: pointer;
  transition: background-color 0.4s ease;
  align-items: stretch;
}

.info-block:hover {
  background-color: #cc3300; /* rouge foncé */
  box-shadow: 0 8px 20px rgba(204, 51, 0, 0.6);
}

/* Image */
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

/* Texte */
.info-text {
  flex-grow: 1;
  padding: 24px 30px;
  color: #fff3e6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-wrap: break-word;
}

/* Titre */
.info-text h2 {
  margin: 0 0 12px 0;
  font-weight: 700;
  font-size: 24px;
  color: #fffde7;
}

/* Description */
.info-text p {
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
  color: #ffeacc;
}

/* Liens dans description */
.link {
  color: #fff3e6;
  text-decoration: underline;
}
.link:hover {
  color: #ffcc80;
  text-decoration: none;
  cursor: pointer;
}

/* Responsive */
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