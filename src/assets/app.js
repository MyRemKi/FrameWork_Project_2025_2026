const app = Vue.createApp({
  data() {
    return {
      depart: "",
      arrivee: "",
      dateDepart: "",
      dateRetour: "",

      villes: [
        "Paris",
        "Londres",
        "New York",
        "Tokyo",
        "Berlin",
        "Madrid",
        "Rome",
        "Lisbonne",
        "Dubai",
        "Bangkok"
      ],

      suggestionsDepart: [],
      suggestionsArrivee: [],

      vols: [
        { id: 1, depart: "Paris", arrivee: "Tokyo", date: "2024-06-10", prix: 650 },
        { id: 2, depart: "Paris", arrivee: "Londres", date: "2024-06-11", prix: 120 },
        { id: 3, depart: "Berlin", arrivee: "Madrid", date: "2024-06-12", prix: 180 },
        { id: 4, depart: "Rome", arrivee: "Dubai", date: "2024-06-15", prix: 500 }
      ]
    }
  },

  computed: {
    volsFiltres() {
      return this.vols.filter(v => {
        return (
          (!this.depart || v.depart === this.depart) &&
          (!this.arrivee || v.arrivee === this.arrivee) &&
          (!this.dateDepart || v.date >= this.dateDepart)
        );
      });
    }
  },

  methods: {
    allerInfoVol(vol) {
        window.location.href = `info-vol.html?id=${vol.id}`;
    },
    filtrerDepart() {
      if (!this.depart) {
        this.suggestionsDepart = [];
        return;
      }
      this.suggestionsDepart = this.villes.filter(ville =>
        ville.toLowerCase().startsWith(this.depart.toLowerCase())
      );
    },

    filtrerArrivee() {
      if (!this.arrivee) {
        this.suggestionsArrivee = [];
        return;
      }
      this.suggestionsArrivee = this.villes.filter(ville =>
        ville.toLowerCase().startsWith(this.arrivee.toLowerCase())
      );
    },

    selectionDepart(v) {
      this.depart = v;
      this.suggestionsDepart = [];
    },

    selectionArrivee(v) {
      this.arrivee = v;
      this.suggestionsArrivee = [];
    },

    fermerSuggestions() {
      this.suggestionsDepart = [];
      this.suggestionsArrivee = [];
    },

    rechercherVols() {
      console.log("Recherche :", this.depart, this.arrivee, this.dateDepart);
    },

    highlight(ville, texte) {
      const regex = new RegExp(`(${texte})`, "i");
      return ville.replace(regex, "<strong>$1</strong>");
    }
  },

  mounted() {
    document.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target)) {
        this.fermerSuggestions();
      }
    });
  }
});

app.mount("#app");