const ACTIONS = {
    TOGGLE_NIGHT_MODE: 'TOGGLE_NIGHT_MODE'
};

const ACTION_CREATORS = {
    toggleNightMode: payload => ({ type: ACTIONS.TOGGLE_NIGHT_MODE, payload })
};

export default { ...ACTIONS, ...ACTION_CREATORS };
