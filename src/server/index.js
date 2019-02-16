const express = require('express');
const os = require('os');
const { fetchWeather } = require('./api/weather');

const app = express();

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.get('/api/getWeather', fetchWeather);

app.listen(process.env.PORT || 8089, () => console.log(`Listening on port ${process.env.PORT || 8089}!`));
