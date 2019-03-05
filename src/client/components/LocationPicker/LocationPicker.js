import React, { Component } from 'react';
import './LocationPicker.less';

/**
 * This component will determine the location of a user.
 * Location data is used to personalize information on the site such as weather reports.
 *
 * The user will be able to overwrite the data if they choose.
 */
export default class LocationPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            zipCode: '',
            validZipCode: false
        };
    }

    async componentDidMount() {
        // Determine if we have location data already stored in the user's local storage
        // We should default to that always
        const zipCodeData = localStorage.getItem('zipCodeData');
        if (!zipCodeData) {
            // If we don't have location data, we can make our own call out to determine where
            const response = await fetch('http://ip-api.com/json');
            const json = await response.json();

            if (json.zip) {
                this.setState({
                    zipCode: json.zip,
                    validZipCode: true
                });

                // Persist for future use
                localStorage.setItem('zipCodeData', json.zip);
            }
        } else {
            const zipCodeValue = JSON.parse(zipCodeData);
            this.setState({
                zipCode: zipCodeValue,
                validZipCode: true
            });
        }
    }

    handleZipCodeInput = (event) => {
        const newInput = event.target.value;

        const regex = new RegExp('^\\d{5}$');
        if (regex.test(newInput)) {
            this.setState({
                zipCode: newInput,
                validZipCode: true
            });

            localStorage.setItem('zipCodeData', newInput);

            // TODO: Force a refresh up top!
        } else {
            this.setState({ validZipCode: false });
        }
    };

    render() {
        const { zipCode, validZipCode } = this.state;

        return (
            <div className="location-picker">
                <span>Zip code:</span>
                <input
                    type="text"
                    className={`zip-code-input zip-code-valid-${validZipCode}`}
                    onKeyUp={this.handleZipCodeInput}
                    placeholder={zipCode}
                />
            </div>
        );
    }
}
