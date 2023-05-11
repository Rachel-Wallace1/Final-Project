import React from 'react';
import popularLocations from './popularLocations';

const PopularDisplay = ({ weatherData }) => {
    console.log(weatherData);
    return (
        <div className="container">
            <h2>Popular Weather Places</h2>
            {weatherData.map((weather, index) => (
                weather && (
                    <div className="row" key={index}>
                        <div className="card mb-4">
                            <h3>{popularLocations[index].name}</h3>
                            <div className="card-body">
                                <p className="card-text">Temperature: {weather.temperature}°F</p>
                                <p className="card-text">Description: {weather.description}</p>
                                <p className="card-text">Humidity: {weather.humidity}</p>
                                <p className="card-text">Wind Speed: {weather.windSpeed}</p>
                            </div>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
};

export default PopularDisplay;

