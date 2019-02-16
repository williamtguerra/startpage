import React, { Component } from 'react';
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
        const { weather } = this.state;
        const { currently } = weather;

        return (
            <div className="weather">
                {currently && (
                    <div className="currently">
                        <div className="current--title title">Currently</div>
                        <div className="current--temperature">{`${currently.temperature}º`}</div>
                        <div className="current--summary">{currently.summary}</div>
                    </div>
                )}
            </div>
        );
    }
}
