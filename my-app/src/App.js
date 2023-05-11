import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LocationForm from './LocationForm';
import WeatherDisplay from './WeatherDisplay';
import WeatherForecast from './WeatherForecast';
import Nav from './Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PopularDisplay from "./PopularDisplay";
import popularLocations from './popularLocations';

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [localTime, setLocalTime] = useState('');
    const [popularWeatherData, setPopularWeatherData] = useState([]);
    const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
    const [showWeather, setShowWeather] = useState(false);


    const getWeatherByZipCode = async (zipCode) => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=AIzaSyBiFa6AYtxVXmpHKNLLCyy1w97Li0mlCDM`
            );
            const { lat, lng } = response.data.results[0].geometry.location;
            await getWeatherByCoordinates(lat, lng);
            getForecastByCoordinates(lat, lng);
            setShowWeather(true);
        } catch (error) {
            console.error('Error getting coordinates:', error);
        }
    };

    const getCoordinatesByZipCode = async (zipCode) => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=AIzaSyBiFa6AYtxVXmpHKNLLCyy1w97Li0mlCDM`
            );
            const { lat, lng } = response.data.results[0].geometry.location;
            return { lat, lng };
        } catch (error) {
            console.error('Error getting coordinates:', error);
            throw error;
        }
    };

    const getWeatherByCoordinates = async (lat, lng) => {
        console.log("getWeatherByCoordinates")
        console.log(lat, lng)
        try {
            const response = await axios.get(
                `http://api.weatherapi.com/v1/current.json?key=2a1769a877554f7e88133029231105&q=${lat},${lng}`
            );
            console.log(response)
            const weather = {
                temperature: response.data.current.temp_f,
                description: response.data.current.condition.text,
                humidity: response.data.current.humidity,
                windSpeed: response.data.current.wind_mph,
            };
            setWeatherData(weather);
            return weather;
        } catch (error) {
            console.error('Error getting weather:', error);
        }
    };

    const getForecastByCoordinates = async (lat, lng) => {
        try {
            const response = await axios.get(
                `http://api.weatherapi.com/v1/forecast.json?key=2a1769a877554f7e88133029231105&q=${lat},${lng}&days=3`
            );
            const forecast = response.data.forecast.forecastday.map((item) => ({
                dateTime: item.date,
                temperature: item.day.avgtemp_f,
                description: item.day.condition.text,
                humidity: item.day.avghumidity,
                windSpeed: item.day.maxwind_mph,
            }));
            setForecastData(forecast);
        } catch (error) {
            console.error('Error getting forecast:', error);
        }
    };

    const fetchPopularWeatherData = async () => {
        const zipCodes = popularLocations.map((location) => location.zipcode);

        const weatherDataPromises = zipCodes.map(async (zipCode) => {
            try {
                const coordinates = await getCoordinatesByZipCode(zipCode);
                const weather = await getWeatherByCoordinates(coordinates.lat, coordinates.lng);
                return { zipCode, weather };
            } catch (error) {
                console.error(`Error fetching weather data for ${zipCode}:`, error);
                return { zipCode, weather: null };
            }
        });

        const weatherData = await Promise.all(weatherDataPromises);
        setPopularWeatherData(weatherData);
    };

    useEffect(() => {
        const updateLocalTime = () => {
            const currentTime = new Date();
            const options = {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short',
            };
            const localTimeString = currentTime.toLocaleString('en-US', options);
            setLocalTime(localTimeString);
        };

        const timer = setInterval(updateLocalTime, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        fetchPopularWeatherData();
        return () => {
        };
    }, []);

    return (
        <Router>
            <div>
                <h1>React Weather App</h1>
                <p>Local Time: {localTime}</p>
                <Nav />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div>
                                <LocationForm onFormSubmit={getWeatherByZipCode} />
                                {showWeather && weatherData && <WeatherDisplay weather={weatherData} />}
                                {forecastData && <WeatherForecast forecast={forecastData} />}
                            </div>
                        }
                    />
                    <Route
                        path="/popular"
                        element={<PopularDisplay weatherData={popularWeatherData.map(item => item.weather)} />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default WeatherApp;