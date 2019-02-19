import React from 'react';
import { connect } from 'react-redux';
import './App.less';
import Header from './components/Header/Header';
import Weather from './components/Weather/Weather';
import actions from './actions/index';

const mapStateToProps = state => ({ nightMode: state.nightMode });

const mapDispatchToProps = dispatch => ({
    toggleNightMode: () => dispatch(actions.toggleNightMode()),
    updateWeatherLocation: location => dispatch(actions.updateWeatherLocation(location))
});

const ConnectedApp = (props) => {
    const { nightMode, toggleNightMode, updateWeatherLocation } = props;
    const theme = 'dark';

    return (
        <div className={`${theme}-theme`}>
            <Header nightMode={nightMode} toggleNightMode={toggleNightMode} />
            <div className="container">
                <Weather updateWeatherLocation={updateWeatherLocation} />
            </div>
        </div>
    );
};

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedApp);

export default App;
