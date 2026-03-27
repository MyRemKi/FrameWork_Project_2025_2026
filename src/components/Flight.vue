<template>
    <head>
        <meta charset="UTF-8">
        <title>Recherche de Vols</title>
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

    <h1>Recherche de Vols</h1>

    <div class="recherche">

    <div class="input-group">
        <label>Ville de départ</label>
        <input
        v-model="depart"
        @input="filtrerDepart"
        placeholder="Ex: Paris">
        <ul v-if="suggestionsDepart.length" class="suggestions">
        <li v-for="ville in suggestionsDepart" @click="selectionDepart(ville)" v-html="highlight(ville, depart)"></li>
        </ul>
    </div>

    <div class="input-group">
        <label>Ville d'arrivée</label>
        <input
        v-model="arrivee"
        @input="filtrerArrivee"
        placeholder="Ex: Tokyo">
        <ul v-if="suggestionsArrivee.length" class="suggestions">
        <li v-for="ville in suggestionsArrivee" @click="selectionArrivee(ville)" v-html="highlight(ville, arrivee)"></li>
        </ul>
    </div>

    <div class="input-group">
        <label>Date départ</label>
        <input type="date" v-model="dateDepart">
    </div>

    <div class="input-group">
        <label>Date retour</label>
        <input type="date" v-model="dateRetour">
    </div>

    <button @click="rechercherVols">Rechercher</button>
    </div>

    <div class="liste-billets">
        <div v-for="vol in volsFiltres" :key="vol.id" class="billet-item" @click="allerInfoVol(vol)">
            <p><strong>Départ :</strong> {{vol.depart}}</p>
            <p><strong>Arrivée :</strong> {{vol.arrivee}}</p>
            <p><strong>Date :</strong> {{vol.date}}</p>
            <p><strong>Prix :</strong> {{vol.prix}} €</p>
        </div>
    </div>

    </main>

    </div>

    </body>
</template>