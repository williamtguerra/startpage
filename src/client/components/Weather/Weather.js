import React, {
    Component
} from 'react';
import './Weather.less';

export default class Weather extends Component {
    state = {
        weather: {}
    };

    async componentDidMount() {
        const res = await fetch('/api/getWeather');
        const weather = await res.json();

        if (weather) {
            this.setState({
                weather
            });
        } else {
            console.error('Error fetching /api/getWeather');
        }
    }

    render() {
        const {
            weather
        } = this.state;

        return (
            <div className="weather">
                <div className="current--title">The weather:</div>
                <div className="current--summary">{weather.currently && weather.currently.summary}</div>
            </div>

        );
    }
}
