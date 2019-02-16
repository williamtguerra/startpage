import React from 'react';
import { connect } from 'react-redux';
import './App.less';
import Header from './components/Header/Header';
import Weather from './components/Weather/Weather';
import actions from './actions/index';

const mapStateToProps = state => ({ nightMode: state.nightMode });

const mapDispatchToProps = dispatch => ({
    toggleNightMode: () => dispatch(actions.toggleNightMode())
});

const ConnectedApp = (props) => {
    const { nightMode, toggleNightMode } = props;
    const theme = 'dark';

    return (
        <div className={`${theme}-theme`}>
            <Header nightMode={nightMode} toggleNightMode={toggleNightMode} />
            <div className="container">
                <Weather />
            </div>
            <footer>
                <pre>{`nightMode: ${nightMode}`}</pre>
            </footer>
        </div>
    );
};

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedApp);

export default App;
