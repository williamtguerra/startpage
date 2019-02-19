const ACTIONS = {
    TOGGLE_NIGHT_MODE: 'TOGGLE_NIGHT_MODE',
    UPDATE_WEATHER_LOCATION: 'UPDATE_WEATHER_LOCATION'
};

const ACTION_CREATORS = {
    toggleNightMode: () => ({ type: ACTIONS.TOGGLE_NIGHT_MODE }),
    updateWeatherLocation: payload => ({ type: ACTIONS.UPDATE_WEATHER_LOCATION, payload })
};

export default { ...ACTIONS, ...ACTION_CREATORS };
