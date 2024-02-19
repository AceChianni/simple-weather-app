"use strict";

class Weather {
    constructor() {
        this.temperature = null;
        this.description = null;
    }

    processWeatherData(data) {
        try {
            const currentWeather = data.current;

            if (currentWeather && currentWeather.temperature !== undefined) {
                this.temperature = currentWeather.temperature;
            } else {
                this.temperature = 'N/A';
            }

            if (currentWeather && currentWeather.weather_descriptions && currentWeather.weather_descriptions[0]) {
                this.description = currentWeather.weather_descriptions[0];
            } else {
                this.description = 'N/A';
            }
            // Process other relevant data from the API response
        } catch (error) {
            console.error('Error processing weather data:', error);
            throw error; // Throw the caught error directly
        }
    }

    displayWeatherInfo() {
        console.log('Displaying weather info');
        const weatherInfoDiv = document.getElementById('weatherInfo');
        weatherInfoDiv.innerHTML = `
            <p>Temperature: ${this.temperature}°C</p>
            <p>Description: ${this.description}</p>
        `;
    }
}

document.getElementById('weatherForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const locationInput = document.getElementById('locationInput').value;

    const apiKey = '39c204ddf0ab508e4e913cb8968a4b72';
    const apiUrl = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${locationInput}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('API response data:', data); // Log the API response data
            const weather = new Weather();
            weather.processWeatherData(data);
            weather.displayWeatherInfo();
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherInfo').innerHTML = 'Error fetching weather data. Please try again.';
        });
});