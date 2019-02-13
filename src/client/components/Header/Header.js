import React, { Component } from 'react';
import './Header.less';

export default class Header extends Component {
    state = {
        theme: 'dark',
        username: null
    };

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

    darkModeToggle = () => {
        const { theme } = this.state;
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        this.setState({
            theme: newTheme
        });
        console.log('New theme:', theme);
    };

    render() {
        const { username } = this.state;
        return (
            <div className="header">
                <div className="username">{`username: ${username}`}</div>
                <div
                    className="dark-mode-toggle"
                    onClick={this.darkModeToggle}
                    onKeyPress={this.darkModeToggle}
                    role="button"
                    tabIndex="0"
                />
            </div>
        );
    }
}
