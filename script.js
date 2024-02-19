"use strict";

class Weather {
    constructor() {
        this.temperature = null;
        this.description = null;
    }

    processWeatherData(data) {
        try {
            // Modify the following based on the structure of the Visual Crossing API response
            const currentWeather = data.currentConditions;

            if (currentWeather && currentWeather.temp !== undefined) {
                this.temperature = currentWeather.temp;
            } else {
                this.temperature = 'N/A';
            }

            if (currentWeather && currentWeather.description) {
                this.description = currentWeather.description;
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

    // Use the Visual Crossing Weather API
    const apiKey = 'TC2PTV3D8BPVCEJFRXN67DET9';
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationInput}?key=${apiKey}&unitGroup=metric&contentType=json`;

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
