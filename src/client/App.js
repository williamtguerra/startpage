import React, {
    Component
} from 'react';
import './app.css';
import Weather from './components/Weather/Weather';

export default class App extends Component {
    state = {
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

    render() {
        const {
            username
        } = this.state;
        return (
            <div>
                {username ? <div>{`Hello ${username}`}</div> : <div>Loading.. please wait!</div>}
                <Weather />
            </div>
        );
    }
}
