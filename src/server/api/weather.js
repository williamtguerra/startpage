const fetch = require('isomorphic-fetch');
const auth = require('./auth.json');

let lastFetch = 0;
let cache = {};

const fetchWeather = async (req, res) => {
    const d = new Date();
    const sinceLastFetch = d.getTime() - lastFetch;
    const token = auth.darkskyKey;

    const loc = {
        lat: 30.3393,
        long: -97.7449
    };
    try {
        if (sinceLastFetch > 1000 * 60) {
            console.log(
                `New darksky api fetch @ ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
            );
            const url = `https://api.darksky.net/forecast/${token}/${loc.lat},${loc.long}`;
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
        console.err(err);
    }
};

module.exports = {
    fetchWeather
};
