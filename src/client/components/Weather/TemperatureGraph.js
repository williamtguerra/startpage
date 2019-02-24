import React, { Component } from 'react';
import { getExtremes } from '../../../helpers/weatherHelper';
import './Weather.less';

const { round } = Math;

export default class TemperatureGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeHour: null
        };
    }

    handleGraphMouseLeave = () => {
        this.setState({
            activeHour: null
        });
    };

    handleGraphMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const activeHour = round((e.clientX - rect.left) / 36) * 36;
        this.setState({
            activeHour
        });
    };

    render() {
        const { activeHour } = this.state;
        const { data } = this.props;

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
                onMouseMove={this.handleGraphMouseMove}
                onMouseLeave={this.handleGraphMouseLeave}
            >
                <line
                    className="temperature--cursor"
                    x1={activeHour || '-1000'}
                    x2={activeHour || '-1000'}
                    y1="0"
                    y2={graphHeight}
                    strokeWidth="2"
                />
                {data.slice(0, 12).map((hour, i) => (
                    <text
                        key={`graph-label-${hour.time}`}
                        fill="#ffffff"
                        stroke="none"
                        x={i * stepWidth + xOffset}
                        y={yOffset + round(hour.temperature) * scale - 10}
                        direction="ltr"
                        textAnchor="middle"
                    >
                        {`${round(hour.temperature)}º`}
                    </text>
                ))}
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
}
