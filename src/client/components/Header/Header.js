import React, { Component } from 'react';
import './Header.less';
import LocationPicker from '../LocationPicker/LocationPicker';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null
        };
    }

    async componentDidMount() {
        const res = await fetch('/api/getUsername');
        const user = await res.json();

        if (user.username) {
            this.setState({
                username: user.username
            });
        } else {
            console.error('');
        }
    }

    render() {
        const { nightMode, toggleNightMode } = this.props;
        const { username } = this.state;

        return (
            <div className="header">
                <div className="username">{`username: ${username}`}</div>
                <button
                    className="btn"
                    onClick={toggleNightMode}
                    onKeyPress={toggleNightMode}
                    type="button"
                    tabIndex="0"
                >
                    {`🌛 (${nightMode})`}
                </button>
                <LocationPicker />
            </div>
        );
    }
}
