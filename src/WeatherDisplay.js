import React from 'react';

const WeatherDisplay = ({ weather }) => {

    return (
        <div className="container">
            <h1>Today</h1>
            <div className="row">
                <div className="card mb-4">
                    <div className="card-body">
                        <p className="card-text">Temperature: {weather.temperature}°F</p>
                        <p className="card-text">Description: {weather.description}</p>
                        <p className="card-text">Humidity: {weather.humidity}</p>
                        <p className="card-text">Wind Speed: {weather.windSpeed}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;
