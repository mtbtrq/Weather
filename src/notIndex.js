const weatherAPIKey = "147a9d4c16ad4796b0a102151210810";

const areaNameEl = document.getElementById("areaName");
const temperatureEl = document.getElementById("temperature");
const conditionEl = document.getElementById("condition");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("windSpeed");
const airPressureEl = document.getElementById("airPressure");
const visibilityEl = document.getElementById("visibility");
const timeUpdatedEl = document.getElementById("timeUpdated");

const cityEl = document.getElementById("cityEl");
const searchButton = document.getElementById("search-button");

async function setValues() {
    const locationAPIRaw = await fetch("https://ipapi.co/json/");
    const locationAPI = await locationAPIRaw.json();
    const city = locationAPI["city"]

    const weatherAPIRaw = await fetch(`http://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=${city}&aqi=no`);
    const weatherAPI = await weatherAPIRaw.json();

    areaNameEl.textContent = "City: " + locationAPI["city"];
    temperatureEl.textContent = "Temperature: " + weatherAPI["current"]["temp_c"] + " °C";
    conditionEl.textContent = "Condition: " +  weatherAPI["current"]["condition"]["text"];
    humidityEl.textContent = "Humidity: " + weatherAPI["current"]["humidity"] + "%";
    windSpeedEl.textContent = "Wind Speed: " + weatherAPI["current"]["wind_kph"] + " km/h";
    airPressureEl.textContent = "Air Pressure: " + weatherAPI["current"]["pressure_mb"] + " hPa";
    visibilityEl.textContent = "Visibility: " + weatherAPI["current"]["vis_km"] + "km";
    timeUpdatedEl.textContent = "Last Update: " + weatherAPI["current"]["last_updated"];
}
setValues();

async function setCityInformation() {
    const cityName = cityEl.value
    cityEl.value = "";

    if (cityName.length < 1) {
        return
    }

    const weatherAPIRaw = await fetch(`http://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=${cityName}&aqi=no`);
    const weatherAPI = await weatherAPIRaw.json();

    areaNameEl.textContent = "City: " + weatherAPI["location"]["name"];
    temperatureEl.textContent = "Temperature: " + weatherAPI["current"]["temp_c"] + " °C";
    conditionEl.textContent = "Condition: " +  weatherAPI["current"]["condition"]["text"];
    humidityEl.textContent = "Humidity: " + weatherAPI["current"]["humidity"] + "%";
    windSpeedEl.textContent = "Wind Speed: " + weatherAPI["current"]["wind_kph"] + " km/h";
    airPressureEl.textContent = "Air Pressure: " + weatherAPI["current"]["pressure_mb"] + " hPa";
    visibilityEl.textContent = "Visibility: " + weatherAPI["current"]["vis_km"] + "km";
    timeUpdatedEl.textContent = "Last Update: " + weatherAPI["current"]["last_updated"];
}
searchButton.addEventListener("click", setCityInformation());

cityEl.addEventListener("keydown", event => {
    if (event.which == 13) {
        setCityInformation();
    };
});