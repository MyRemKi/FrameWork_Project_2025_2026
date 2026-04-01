const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/airports_suggestions", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing query" });

  try {
    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        engine: "google_flights_autocomplete",
        q,
        api_key: process.env.SERPAPI_KEY
      }
    });

    const suggestions = (response.data.suggestions || []).map(a => ({
      city: a.city || a.name,
      country: a.country || "",
      iata: a.id
    }));

    res.json(suggestions);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});


app.get("/api/flights-oneway", async (req, res) => {
  const { departure_id, arrival_id, date } = req.query;
  if (!departure_id || !arrival_id || !date) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const params = {
      engine: "google_flights",
      departure_id,
      arrival_id,
      outbound_date: date,
      type: 2,
      hl: "fr",
      gl: "fr",
      api_key: process.env.SERPAPI_KEY
    };

    const response = await axios.get("https://serpapi.com/search.json", { params });

    const allFlights = [
      ...(response.data.best_flights || []),
      ...(response.data.other_flights || [])
    ];

    const flightResults = allFlights.map(f => {
      if (!f.flights || !f.flights.length) return null;

      let link = "";
      try {
        const out = f.flights[0];
        const arr = f.flights[f.flights.length - 1];
        link = `https://www.google.com/flights?hl=fr#flt=${out.departure_airport.id}.${arr.arrival_airport.id}.${date}`;
      } catch (e) { link = ""; }

      return {
        price: f.price || 0,
        flights: f.flights.map(l => ({
          departure_airport: { id: l.departure_airport?.id, city: l.departure_airport?.city },
          arrival_airport: { id: l.arrival_airport?.id, city: l.arrival_airport?.city },
          airline: l.airline,
          departure_time: l.departure_time,
          arrival_time: l.arrival_time
        })),
        link
      };
    }).filter(Boolean);

    res.json({ flights: flightResults });
  } catch (err) {
    console.error("SERPAPI ERROR :", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});


app.get("/api/flights-roundtrip", async (req, res) => {
  const { departure_id, arrival_id, date, return_date } = req.query;
  if (!departure_id || !arrival_id || !date || !return_date) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const params = {
      engine: "google_flights",
      departure_id,
      arrival_id,
      outbound_date: date,
      return_date,
      type: 1,
      hl: "fr",
      gl: "fr",
      api_key: process.env.SERPAPI_KEY
    };

    const response = await axios.get("https://serpapi.com/search.json", { params });

    const allFlights = [
      ...(response.data.best_flights || []),
      ...(response.data.other_flights || [])
    ];

    const flightResults = allFlights.map(f => {
      if (!f.flights || !f.flights.length) return null;

      let link = "";
      try {
        const out = f.flights[0];
        const ret = f.flights[f.flights.length - 1];
        link = `https://www.google.com/flights?hl=fr#flt=${out.departure_airport.id}.${ret.arrival_airport.id}.${date}*${ret.arrival_airport.id}.${out.departure_airport.id}.${return_date}`;
      } catch (e) { link = ""; }

      return {
        price: f.price || 0,
        flights: f.flights.map(l => ({
          departure_airport: { id: l.departure_airport?.id, city: l.departure_airport?.city },
          arrival_airport: { id: l.arrival_airport?.id, city: l.arrival_airport?.city },
          airline: l.airline,
          departure_time: l.departure_time,
          arrival_time: l.arrival_time
        })),
        link
      };
    }).filter(Boolean);

    res.json({ flights: flightResults });
  } catch (err) {
    console.error("SERPAPI ERROR :", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});


app.get("/api/hotels_suggestions", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing query" });

  try {
    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        engine: "google_places",
        type: "lodging",
        q,
        hl: "fr",
        gl: "fr",
        api_key: process.env.SERPAPI_KEY
      }
    });

    const suggestions = (response.data.local_results || []).map(h => ({
      name: h.title,
      address: h.address || "",
      place_id: h.place_id
    }));

    res.json(suggestions);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});


app.get("/api/hotels", async (req, res) => {
  const { q, check_in_date, check_out_date, adults } = req.query;
  if (!q || !check_in_date || !check_out_date) {
    return res.status(400).json({ error: "Missing required params" });
  }

  try {
    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        engine: "google_hotels",
        q,
        check_in_date,
        check_out_date,
        adults: adults || 2,
        hl: "fr",
        gl: "fr",
        currency: "EUR",
        api_key: process.env.SERPAPI_KEY
      }
    });

    const nights = Math.max(1, (new Date(check_out_date) - new Date(check_in_date)) / (1000 * 60 * 60 * 24));

    const hotels = (response.data.properties || []).map(h => ({
      ...h,
      rate_per_night: h.rate_per_night,
      total_price: h.rate_per_night?.lowest ? (h.rate_per_night.lowest * nights).toFixed(2) : "-",
      rating: h.rating ? parseFloat(h.rating.toFixed(1)) : "-" 
    }));

    res.json({ hotels });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});


app.get("/api/hotels_by_id", async (req, res) => {
  const { hotel_id, check_in_date, check_out_date, adults } = req.query;
  if (!hotel_id || !check_in_date || !check_out_date) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        engine: "google_hotels",
        hl: "fr",
        gl: "fr",
        currency: "EUR",
        hotel_id,
        check_in_date,
        check_out_date,
        adults: adults || 2,
        api_key: process.env.SERPAPI_KEY
      }
    });

    const nights = Math.max(1, (new Date(check_out_date) - new Date(check_in_date)) / (1000 * 60 * 60 * 24));

    const hotels = (response.data.properties || []).map(h => ({
      ...h,
      rate_per_night: h.rate_per_night,
      total_price: h.rate_per_night?.lowest ? (h.rate_per_night.lowest * nights).toFixed(2) : "-",
      rating: h.rating ? parseFloat(h.rating.toFixed(1)) : "-"
    }));

    res.json({ hotels });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));