const { round } = Math;

const getDateString = (time) => {
    const date = new Date(time);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric'
    };
    return date.toLocaleString('en-US', options);
};

const getExtremes = (data) => {
    let maxTemp = -Infinity;
    let minTemp = Infinity;
    data.forEach((hour) => {
        const { temperature } = hour;
        if (temperature < minTemp) {
            minTemp = temperature;
        }
        if (temperature > maxTemp) {
            maxTemp = temperature;
        }
    });

    return {
        maxTemp,
        minTemp
    };
};

const getWindDirection = (windBearing) => {
    let windDirection;
    switch (round(windBearing / 45)) {
    case 0:
    case 8:
        windDirection = 'N';
        break;
    case 1:
        windDirection = 'NE';
        break;
    case 2:
        windDirection = 'E';
        break;
    case 3:
        windDirection = 'SE';
        break;
    case 4:
        windDirection = 'S';
        break;
    case 5:
        windDirection = 'SW';
        break;
    case 6:
        windDirection = 'W';
        break;
    case 7:
        windDirection = 'NW';
        break;
    default:
        windDirection = '';
    }
    return windDirection;
};

const iconsMap = {
    'clear-day': '☀️',
    'clear-night': '🌛',
    rain: '🌧',
    snow: '☃️',
    sleet: '🌨',
    wind: '🌬',
    fog: '🌁',
    cloudy: '☁️',
    'partly-cloudy-day': '⛅️',
    'partly-cloudy-night': '☁️'
};

const getIcon = icon => iconsMap[icon];

export default getWindDirection;
export {
    getDateString, getExtremes, getIcon, getWindDirection
};
