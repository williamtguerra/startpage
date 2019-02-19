const initialState = {
    nightMode: false,
    weatherLocation: {}
};

const rootReducer = (state = initialState, action) => {
    if (action.type === 'TOGGLE_NIGHT_MODE') {
        return Object.assign({}, state, {
            nightMode: !state.nightMode
        });
    }
    if (action.type === 'UPDATE_WEATHER_LOCATION') {
        return Object.assign({}, state, {
            weatherLocation: action.payload
        });
    }
    return state;
};

export default rootReducer;
