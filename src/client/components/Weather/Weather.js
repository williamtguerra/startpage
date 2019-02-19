import React, { Component } from 'react';
import {
    getDateString,
    getExtremes,
    getIcon,
    getWindDirection
} from '../../../helpers/weatherHelper';
import './Weather.less';

const { abs, round } = Math;

export default class Weather extends Component {
    state = {
        current: null,
        hourly: null
    };

    async componentDidMount() {
        const res = await fetch('/api/getWeather');
        const weather = await res.json();

        if (weather) {
            this.setState({
                current: weather.currently,
                hourly: weather.hourly
            });
        } else {
            console.error('Error fetching /api/getWeather');
        }
    }

    renderCurrent() {
        const { current } = this.state;
        const {
            icon, summary, temperature, time
        } = current;

        const dateString = getDateString(time * 1000);
        const temp = round(temperature);

        return (
            <div className="weather-current weather-section">
                <div className="current-date">{dateString}</div>
                <div className="current-summary">{summary}</div>
                <div className="current-temperature">{`${temp}º F ${getIcon(icon)}`}</div>
            </div>
        );
    }

    renderStats() {
        const { current } = this.state;
        const {
            apparentTemperature,
            humidity,
            precipProbability,
            temperature,
            windBearing,
            windSpeed
        } = current;

        const showApparent = abs(round(temperature) - round(apparentTemperature)) > 1;
        const windDirection = getWindDirection(330 || windBearing);

        return (
            <div className="weather-stats weather-section">
                {showApparent && (
                    <div className="current-apparent">{`Feels like ${apparentTemperature}`}</div>
                )}
                <div className="current-precip">{`Precipitation: ${precipProbability}%`}</div>
                <div className="current-humidity">{`Humidity: ${round(humidity)}%`}</div>
                <div className="current-wind">
                    {`Wind: ${round(windSpeed)} mph ${windDirection}`}
                </div>
            </div>
        );
    }

    renderHourly() {
        const { hourly } = this.state;
        const { data, summary } = hourly;

        const hours = data.slice(0, 12);

        return (
            <div className="weather-hourly weather-section">
                <div className="hourly-graph">{this.renderHourlyGraph(hours)}</div>
                <div className="hourly-hours">
                    {hours.map((hour, i) => this.renderHour(hour, i))}
                </div>
                <div className="hourly-sumary">{summary}</div>
            </div>
        );
    }

    renderHourlyGraph(data) {
        const graphWidth = 828;
        const graphHeight = 100;
        const { maxTemp, minTemp } = getExtremes(data);
        const padding = 5;
        const range = minTemp - maxTemp - 2 * padding;
        const stepWidth = 72;
        const xOffset = stepWidth / 2;
        const scale = graphHeight / range;
        const yOffset = -(graphHeight * (maxTemp + padding)) / range;

        const d = data
            .slice(0, 12)
            .map(
                (hour, i) => `${i === 0 ? 'M' : 'L'} ${i * stepWidth + xOffset} ${yOffset
                        + round(hour.temperature) * scale}`
            )
            .join(' ');

        return (
            <svg
                className="hourly-graph-svg"
                width={graphWidth + xOffset}
                height={graphHeight}
                strokeWidth="3"
            >
                <path className="temperature--line" d={`${d}`} fill="none" />
                <path
                    className="temperature--fill"
                    d={`${d} V ${graphHeight} L ${xOffset} ${graphHeight} Z`}
                    stroke="none"
                    fill="rgba(255, 255, 200, 0.3)"
                />
            </svg>
        );
    }

    renderHour(hour, index) {
        const {
            icon, precipProbability, summary, temperature, time
        } = hour;
        const date = new Date(time * 1000);

        return (
            <div className="hour" key={`hour-${index}`} title={summary}>
                <div className="hour-temperature">{`${round(temperature)}º ${getIcon(icon)}`}</div>
                <div className="hour-precipProbability">{`${precipProbability}%`}</div>
                <div className="hour-time">
                    {`${date.toLocaleTimeString('en-US', {
                        hour: 'numeric'
                    })}`}
                </div>
            </div>
        );
    }

    render() {
        const { current, hourly } = this.state;

        return (
            <div className="weather">
                <div className="weather-info">
                    {current && this.renderCurrent()}
                    {current && this.renderStats()}
                </div>
                <div className="weather-graph">{hourly && this.renderHourly()}</div>
                <a className="weather-disclaimer" href="https://darksky.net/poweredby/">
                    Powered by Dark Sky
                </a>
            </div>
        );
    }
}
