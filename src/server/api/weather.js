const fetch = require('isomorphic-fetch');
const auth = require('./auth.json');
const { readGeocodeCache, writeGeocodeCache } = require('../cache/geoCode');
const { isValidZipCode } = require('../../helpers/weatherHelper');

let lastFetch = 0;
let cache = {};

// Location & Geocode variables
const GEOCODE_CACHE = readGeocodeCache();

const fetchWeather = async (req, res) => {
    // Validate the zip code request is valid before we attempt to make any further API calls
    const { zipCode } = req.query;
    if (!isValidZipCode(zipCode)) {
        console.log(`Received weather request for invalid ZipCode=${zipCode}, aborting.`);
        res.send({});
        return;
    }

    // Once we know the zip code is valid, let's call out to the GeoCode API to convert to lat/lng
    // for the weather api.
    // This is a pretty expensive call (latency & money), so let's use a cache when we can.
    const geoCodeToken = auth.geoCodeKey;
    let loc;
    try {
        console.log(`Received weather request for ZipCode=${zipCode}`);

        if (GEOCODE_CACHE[zipCode]) {
            loc = GEOCODE_CACHE[zipCode];
            console.log(
                `Cache hit for lat/long for ZipCode=${zipCode}, Lat/lng=${loc.lat}, ${loc.lng}`
            );
        } else {
            console.log(`Cache miss, calling out to GeoCode API for ZipCode=${zipCode}`);
            const geoCodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${geoCodeToken}`;

            const response = await fetch(geoCodeUrl);
            const json = await response.json();

            // Store the lat/lng for this zip code, and persist it off to our cache
            loc = json.results[0].geometry.location;
            GEOCODE_CACHE[zipCode] = loc;
            writeGeocodeCache(GEOCODE_CACHE);
        }
    } catch (err) {
        console.log(err);
    }

    const d = new Date();
    const sinceLastFetch = d.getTime() - lastFetch;
    const token = auth.darkskyKey;

    try {
        if (sinceLastFetch > 1000 * 60 * 5) {
            console.log(
                `New darksky api fetch @ ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
            );

            const { lat, lng } = loc;
            const url = `https://api.darksky.net/forecast/${token}/${lat},${lng}`;
            const response = await fetch(url);
            const weather = await response.json();

            lastFetch = d.getTime();
            cache = weather;

            res.send(weather);
        } else {
            console.log(`Returning cached response from ${sinceLastFetch / 1000} seconds ago.`);
            res.send(cache);
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    fetchWeather
};
