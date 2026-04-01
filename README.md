# TravelApp

## Objectif du projet
TravelApp est une application web qui permet aux utilisateurs de rechercher et réserver des **vols** ainsi que des **hôtels**. L'objectif est de centraliser toutes les informations de voyage dans une interface simple, intuitive et responsive, afin de faciliter la planification et la réservation.


## Fonctionnalités principales
- **Recherche de vols** : aller simple ou aller-retour, avec suggestions automatiques de villes et aéroports.
- **Affichage des résultats de vols** : itinéraire complet, compagnie aérienne, prix et lien vers la réservation.
- **Recherche d’hôtels** : affichage d’options disponibles dans une ville (fonctionnalité future).
- **Responsive design** : adaptée aux mobiles, tablettes et desktop.
- **Background dynamique** : image différente selon la page (Vols ou Hôtels).
- **Debounce sur la saisie** : limite les requêtes API et améliore la performance.

## Organisation du projet
- **Auteur** : [Ton nom]  
- **Méthode d’organisation** : développement séquentiel en suivant le workflow frontend/backend. D'abord le design et la logique Vue pour le frontend, puis la création de l’API backend avec Express pour fournir les données nécessaires à l’application.


## Difficultés rencontrées et solutions
- **Gestion du background dynamique selon la page** : solution via un `watch` sur `$route` dans `App.vue`.
- **Limiter les requêtes API lors de la saisie** : solution `debounce` avec `setTimeout`.
- **Affichage conditionnel de la date retour pour les vols aller-retour** : solution avec `v-if` et `watch` sur `search.roundtrip`.
- **Synchronisation des données du vol aller-retour** : gestion avec Flatpickr et mise à jour du state Vue.
- **Affichage des images de fond différentes selon la page** : solution avec la méthode `updateBodyBackground()` dans `App.vue`.


## Installation et lancement

### Prérequis
- Node.js (version recommandée >=16)
- npm (ou yarn)

### Installation des dépendances

#### Frontend (Vue 3 + Vite)
Depuis le dossier frontend :
bash
npm install
npm install axios flatpickr vue-router@4 @fortawesome/fontawesome-free
Backend (Node.js + Express)

Depuis le dossier backend :

npm install express cors axios
npm install --save-dev nodemon

### Lancement de l’application

- **Il faut lancer deux serveurs en parallèle "**

Backend (API) :
cd backend
"npm run dev" et "node server.js"

Frontend (interface utilisateur) :
cd FrameWorkWeb_2025_2026
npm run dev

Ensuite, ouvre ton navigateur sur l’URL indiquée par Vite (souvent http://localhost:5173) pour accéder à l’application.

### Bonus / Documents supplémentaires

Pour illustrer le projet et compléter le rendu :

Maquettes Figma : Lien vers Figma

API Backend : Express avec endpoints pour les vols (/api/flights-oneway, /api/flights-roundtrip) et suggestions d’aéroports (/api/airports_suggestions).

Code de l’API : inclus dans le dossier backend.

### Explication de l’API 
l’API fournit des données JSON simulant des vols et des suggestions d’aéroports, directement utilisables par le frontend Vue.
Contact

Pour toute question ou besoin concernant l’application, vous pouvez me contacter à : remi.kalkan@hotmail.com