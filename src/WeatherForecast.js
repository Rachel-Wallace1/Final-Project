import React from 'react';

const WeatherForecast = ({ forecast }) => {

    return (
        <div className="container">
            <h1>Daily Forecast</h1>
            <div className="row">
                {forecast.map((item, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">{item.dateTime}</h5>
                                <p className="card-text">Temperature: {item.temperature}°F</p>
                                <p className="card-text">Description: {item.description}</p>
                                <p className="card-text">Humidity: {item.humidity}</p>
                                <p className="card-text">Wind Speed: {item.windSpeed}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherForecast;