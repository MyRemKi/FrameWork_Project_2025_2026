const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {

const { q } = req.query;

if (!q) {
return res.status(400).json({ error: "Missing query" });
}

try {

const response = await axios.get(
"https://serpapi.com/search.json",
{
params: {
engine: "google_flights_autocomplete",
q: q,
api_key: process.env.SERPAPI_KEY
}
}
);

const suggestions = (response.data.suggestions || []).map(a => ({
city: a.city || a.name,
country: a.country || "",
iata: a.id
}));

res.json(suggestions);

} catch (err) {

console.error(err.response?.data || err.message);

res.status(500).json({
error: err.message
});

}

});

module.exports = router;