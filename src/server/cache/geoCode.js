const fs = require('fs');

const geocodeCacheFile = 'geocodeCache.json';

const readGeocodeCache = () => {
    try {
        const rawJson = fs.readFileSync(geocodeCacheFile);
        const cacheData = JSON.parse(rawJson);
        console.log(`Loaded ${Object.keys(cacheData).length} keys from geocode cache.`);
        return cacheData;
    } catch (err) {
        console.log('Failed to read GeoCode cache, file was not able to be read.');
        return {};
    }
};

const writeGeocodeCache = (cache) => {
    const rawJson = JSON.stringify(cache);
    fs.writeFileSync(geocodeCacheFile, rawJson);
    console.log('Successfully wrote geocode cache to file system.');
};

module.exports = { readGeocodeCache, writeGeocodeCache };
