<script>
    const vols = [
    { id: 1, depart: "Paris", arrivee: "Tokyo", date: "2024-06-10", prix: 650 },
    { id: 2, depart: "Paris", arrivee: "Londres", date: "2024-06-11", prix: 120 },
    { id: 3, depart: "Berlin", arrivee: "Madrid", date: "2024-06-12", prix: 180 },
    { id: 4, depart: "Rome", arrivee: "Dubai", date: "2024-06-15", prix: 500 }
    ];

    const app = Vue.createApp({
    data() {
        return {
        vol: null
        }
    },
    mounted() {
        const params = new URLSearchParams(window.location.search);
        const id = parseInt(params.get("id"));
        this.vol = vols.find(v => v.id === id);
    }
    });
</script>

<template>
<head>
<meta charset="UTF-8">
<title>Informations Vol</title>
<link rel="stylesheet" href="style.css">
<script src="https://unpkg.com/vue@3"></script>
</head>
<body class="flight"> 

<header class="nav-vol">
<nav>
  <ul>
    <li><a href="index.html">Accueil</a></li>
    <li><a href="vols.html">Vols</a></li>
    <li><a href="hotels.html">Hôtels</a></li>
    <li><a href="apropos.html">À propos</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>
</header>

<div id="app">
<main>
  <h1>Détails du Vol</h1>
  
  <div v-if="vol" class="billet-item">
    <p><strong>Départ :</strong> {{vol.depart}}</p>
    <p><strong>Arrivée :</strong> {{vol.arrivee}}</p>
    <p><strong>Date :</strong> {{vol.date}}</p>
    <p><strong>Prix :</strong> {{vol.prix}} €</p>
    <p><strong>Informations supplémentaires :</strong> Ce vol est opéré par la compagnie XYZ. Les bagages et services à bord sont inclus.</p>
  </div>

  <div v-else>
    <p>Vol introuvable.</p>
  </div>
  
  <button onclick="window.history.back()">Retour</button>
</main>
</div>

</body>
</template>