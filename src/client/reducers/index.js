const initialState = {
    nightMode: false
};

const rootReducer = (state = initialState, action) => {
    if (action.type === 'TOGGLE_NIGHT_MODE') {
        return Object.assign({}, state, {
            nightMode: !state.nightMode
        });
    }
    return state;
};

export default rootReducer;
